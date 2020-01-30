import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../helpers/app.service';
import { MustMatch } from '../helpers/must-match.validator';
import { Constant } from '../util/constant';
import { Label } from '../util/labels';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private af: AngularFirestore,
    private app: AppService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', [Validators.required, Validators.min(6)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.spinner.show();
      let obj = this.registerForm.value;
      this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password).then((res: any) => {
        delete obj.confirmPassword;
        obj.userId = res.user.uid;
        res.user.updateProfile({ displayName: obj.name, photoURL: '' });
        this.af.collection(Constant.COLLECTION.USERS).add(obj).then((res) => {
          this.resetForm();
          this.app.showSuccessToast(Label.SUCCESS.REGISTER);
          this.spinner.hide();
        }).catch((err: any) => {
          this.app.showErrorToast(Label.ERROR.ADD);
        });
      }).catch(err => {
        this.spinner.hide();
        this.app.showErrorToast(Label.ERROR.ADD);
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
