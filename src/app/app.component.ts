import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from './helpers/app.service';
import { Constant } from './helpers/constant';


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
