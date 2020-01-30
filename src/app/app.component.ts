import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

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
  submitted = false;
  displayName: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
    let name = sessionStorage.getItem('displayName');
    this.displayName = name;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      let obj = this.loginForm.value;
      this.afAuth.auth.signInWithEmailAndPassword(obj.email, obj.password).then((res) => {
        sessionStorage.setItem('userId', res.user.uid);
        sessionStorage.setItem('displayName', res.user.displayName);
        this.displayName = res.user.displayName;
        this.displayLoginModal = false;
        this.spinner.hide();
        this.router.navigate(['/']);
      });
    }
  }

  logout() {
    this.spinner.show();
    this.afAuth.auth.signOut().then(() => {
      sessionStorage.clear();
      this.displayName = '';
      this.spinner.hide();
      this.router.navigate(['/']);
    });
  }

  goToListPage() {
    this.router.navigate(['/pedia', this.searchText]);
  }

  goToRegisterPage() {
    this.displayLoginModal = false;
    this.router.navigate(['/register']);
  }

  goToWritePediaPage() {
    let userId = sessionStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['/admin/add']);
    } else {
      this.displayLoginModal = true;
    }
  }

}
