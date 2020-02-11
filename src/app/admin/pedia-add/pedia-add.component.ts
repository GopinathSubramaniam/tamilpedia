import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AppService } from 'src/app/helpers/app.service';
import { Constant } from 'src/app/helpers/constant';
import { Label } from 'src/app/helpers/labels';

@Component({
  selector: 'app-pedia-add',
  templateUrl: './pedia-add.component.html',
  styleUrls: ['./pedia-add.component.css']
})
export class PediaAddComponent implements OnInit {

  submitted: boolean = false;
  categories: any[];
  categoryFormSubmitted: boolean = false;
  addPediaForm: FormGroup;
  createCatForm: FormGroup;
  displayCreateCatModal: boolean = false;

  constructor(
    private af: AngularFirestore,
    private formBuilder: FormBuilder,
    private app: AppService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.addPediaForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(500)]],
    });

    this.createCatForm = this.formBuilder.group({
      catValue: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() { return this.addPediaForm.controls; }
  get ccf() { return this.createCatForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addPediaForm.valid) {

      this.app.showSpinner();
      let obj = this.addPediaForm.value;//Pedia master object
      obj.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      obj.createdBy = Constant.getDisplayName();
      obj.userId = Constant.getUserId();

      let pediaHintObj = Object.assign({}, obj);//Pedia hint object
      pediaHintObj.content = pediaHintObj.content.substring(0, 200);
      this.af.collection(Constant.COLLECTION.PEDIA_HINT).add(pediaHintObj).then((pediaHintRes: any) => {
        console.log('pediaHintRes = ', pediaHintRes);
        this.af.collection(Constant.COLLECTION.PEDIA_MASTER).doc(pediaHintRes.id).set(obj).then((res: any) => {
          this.app.hideSpinner();
          this.app.showSuccessToast(Label.SUCCESS.ADD);
          this.resetForm();
        });
      });
    }
  }

  resetForm() {
    this.addPediaForm.reset();
    this.submitted = false;
  }

  createCategory() {
    this.categoryFormSubmitted = true;

    if (this.createCatForm.valid) {
      this.app.showSpinner();
      let formObj = this.createCatForm.value;
      let val = formObj.catValue.toLowerCase();
      let obj = {
        label: (val.charAt(0).toUpperCase() + val.slice('1')),
        value: val,
        expandedIcon: 'fa fa-caret-down',
        collapsedIcon: 'fa fa-caret-right',
      };
      let key = val.replace(/ /g, '').trim();
      this.af.collection(Constant.COLLECTION.CATEGORIES).doc(key).set(obj).then(res => {
        this.app.hideSpinner();
        this.getCategories();
        this.app.showSuccessToast(Label.SUCCESS.ADD);
        this.createCatForm.reset();
        this.displayCreateCatModal = false;
      }).catch(err => {
        this.app.hideSpinner();
        this.app.showErrorToast(Label.ERROR.ADD);
      });
    }
  }

  getCategories() {
    this.app.showSpinner();
    let catSubscribe = this.af.collection(Constant.COLLECTION.CATEGORIES).valueChanges().subscribe((data) => {
      this.categories = data;
      catSubscribe.unsubscribe();
      this.app.hideSpinner();
    });
  }
}
