import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './helpers/app.service';
import { Constant } from './helpers/constant';
import { MenuService } from './helpers/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Test';
  searchText: string = '';
  displayLoginModal: boolean = false;
  loginForm: FormGroup;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  submitted = false;
  displayName: string;

  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private app: AppService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
    this.displayName = Constant.getDisplayName();
    this.isLoggedIn = Constant.isLoggedIn();
    this.watchBreadCrumb();
  }

  watchBreadCrumb() {
    this.menu = MenuService.getAllMenus();
    this.router.events.subscribe((router: any) => {
      if (router instanceof NavigationEnd) {
        let routerUrl = router.urlAfterRedirects;
        if (routerUrl && typeof routerUrl === 'string') {
          let urls = routerUrl.split('/');
          if (this.breadcrumbList.length === 0 || routerUrl == '/') {
            this.breadcrumbList = [];
            this.breadcrumbList.push({ name: 'Home', path: '' });
          }
          urls.forEach(url => {
            let target: any = this.menu.find(page => {
              return page.pathRef === url;
            });
            if (target && target.name && target.name.toLowerCase() !== 'home') {
              let name = target.name;
              let path = target.path;
              if (name.startsWith(':') > -1) {
                name = urls.pop();
                name = name.charAt(0).toUpperCase() + name.substr(1);
                path = path.replace(target.name, name);
              }
              let idx = 0;
              this.breadcrumbList.forEach((ele, i) => {
                if (ele.name == name) {
                  idx = i;
                }
              });
              if (idx === 0) {
                this.breadcrumbList.push({ name: name, path: routerUrl });
              } else {
                this.breadcrumbList = this.breadcrumbList.splice(0, idx + 1);
              }
            }
          });


          let routerList = routerUrl.slice(1).split('/');
        }
      }
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.app.showSpinner();
      let obj = this.loginForm.value;
      this.afAuth.auth.signInWithEmailAndPassword(obj.email, obj.password).then((res) => {
        sessionStorage.setItem(Constant.SESSION_VARIABLE.USER_ID, res.user.uid);
        sessionStorage.setItem(Constant.SESSION_VARIABLE.DISPLAY_NAME, res.user.displayName);
        this.displayName = res.user.displayName;
        this.displayLoginModal = false;
        this.isLoggedIn = true;
        this.app.hideSpinner();
        this.router.navigate(['/']);
      }).catch((err) => {
        this.app.hideSpinner();
        console.log('Login error = ', err);
        this.app.showErrorToast(err.message);
      });
    }
  }

  logout() {
    this.app.showSpinner();
    this.afAuth.auth.signOut().then(() => {
      sessionStorage.clear();
      this.displayName = '';
      this.app.hideSpinner();
      this.router.navigate(['/']);
      this.isLoggedIn = Constant.isLoggedIn();
    });
  }

  goToListPage() {
    this.router.navigate(['/pedia/list', this.searchText]);
  }

  goToRegisterPage() {
    this.displayLoginModal = false;
    this.router.navigate(['/register']);
  }

  goToWritePediaPage() {
    let userId = Constant.getUserId();
    if (userId) {
      this.router.navigate(['/admin/add']);
    } else {
      this.displayLoginModal = true;
    }
  }

}
