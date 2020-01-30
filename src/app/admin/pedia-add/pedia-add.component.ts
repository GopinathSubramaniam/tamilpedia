import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Constant } from 'src/app/util/constant';
import { Label } from 'src/app/util/labels';
import { AppService } from 'src/app/helpers/app.service';

@Component({
  selector: 'app-pedia-add',
  templateUrl: './pedia-add.component.html',
  styleUrls: ['./pedia-add.component.css']
})
export class PediaAddComponent implements OnInit {

  submitted: boolean = false;
  addPediaForm: FormGroup;

  constructor(
    private af: AngularFirestore,
    private formBuilder: FormBuilder,
    private app: AppService
  ) { }

  ngOnInit() {
    this.addPediaForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(500)]],
    });
  }

  get f() { return this.addPediaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addPediaForm.valid) {

      this.app.showSpinner();
      let obj = this.addPediaForm.value;
      obj.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      obj.createdBy = Constant.getDisplayName();
      obj.userId = Constant.getUserId();
      this.af.collection(Constant.COLLECTION.PEDIAS).add(this.addPediaForm.value).then((res: any) => {
        this.app.hideSpinner();
        this.app.showSuccessToast(Label.SUCCESS.ADD);
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.addPediaForm.reset();
    this.submitted = false;
  }

}
