import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AppService } from 'src/app/helpers/app.service';
import { Constant } from 'src/app/helpers/constant';
import { Label } from 'src/app/helpers/labels';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-pedia-add',
  templateUrl: './pedia-add.component.html',
  styleUrls: ['./pedia-add.component.css']
})
export class PediaAddComponent implements OnInit {

  replaceList = ['a', 'of', 'is', 'an', 'are', 'was', 'where', 'there', 'they', 'those', 'to', 'as'];
  submitted: boolean = false;
  categories: any[];
  categoryFormSubmitted: boolean = false;
  addPediaForm: FormGroup;
  createCatForm: FormGroup;
  displayCreateCatModal: boolean = false;
  pediaKey: string;

  constructor(
    private af: AngularFirestore,
    private formBuilder: FormBuilder,
    private app: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCategories();
    this.addPediaForm = this.formBuilder.group({
      id: ['', []],
      createdAt: ['', []],
      createdBy: ['', []],
      updatedAt: ['', []],
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(500)]],
      tags: ['', [Validators.required]],
    });

    this.createCatForm = this.formBuilder.group({
      catValue: ['', [Validators.required, Validators.minLength(5)]],
    });
    let paramSubscribe = this.route.paramMap.subscribe(params => {
      this.pediaKey = params.get('id');
      this.getPediaDetail();
    });
    paramSubscribe.unsubscribe();
  }

  get f() { return this.addPediaForm.controls; }
  get ccf() { return this.createCatForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addPediaForm.valid) {

      this.app.showSpinner();
      let obj = this.addPediaForm.value;//Pedia master object
      if (this.pediaKey) {
        obj.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      } else {
        obj.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        obj.createdBy = Constant.getDisplayName();
      }
      obj.userId = Constant.getUserId();
      if (typeof obj.tags !== 'object') {
        obj.tags = obj.tags.toLowerCase().split(',');//Assigning splitted tags to "tags"
      }
      let catVal = Constant.toLowTrim(obj.category);
      if (obj.tags.indexOf(catVal) == -1) {
        obj.tags.push(catVal);//Pushing category into tags
      }

      //#region  Pusing titles 
      let titles = obj.title.split(' ');
      titles.forEach(title => {
        let trimmedTitle = Constant.toLowTrim(title);
        if (this.replaceList.indexOf(trimmedTitle) !== -1 && obj.tags.indexOf(trimmedTitle) == -1)
          obj.tags.push(trimmedTitle);
      });
      //#endregion

      let pediaHintObj = Object.assign({}, obj);//Pedia hint object
      pediaHintObj.content = pediaHintObj.content.substring(0, 200);
      let promise = null;
      if (this.pediaKey) {
        promise = this.af.collection(Constant.COLLECTION.PEDIA_HINT).doc(this.pediaKey).set(pediaHintObj);
      } else {
        promise = this.af.collection(Constant.COLLECTION.PEDIA_HINT).add(pediaHintObj);
      }
      promise.then((pediaHintRes: any) => {
        let key = this.pediaKey ? this.pediaKey : pediaHintRes.id;
        this.af.collection(Constant.COLLECTION.PEDIA_MASTER).doc(key).set(obj).then((res: any) => {
          this.app.hideSpinner();
          if (this.pediaKey) {
            this.app.showSuccessToast(Label.SUCCESS.UPDATE);
          } else {
            this.app.showSuccessToast(Label.SUCCESS.ADD);
          }
          if (!this.pediaKey) {
            this.resetForm();
          }
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

  getPediaDetail() {
    this.app.showSpinner();
    this.af.collection(Constant.COLLECTION.PEDIA_MASTER).doc(this.pediaKey).get().toPromise().then((res) => {
      let obj = res.data();
      obj.id = res.id;
      this.addPediaForm.patchValue(obj);
      this.app.hideSpinner();
    });
  }
}
