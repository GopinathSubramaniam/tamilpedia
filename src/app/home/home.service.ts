import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { RestService } from '../util/rest.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Constant } from '../helpers/constant';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private af: AngularFirestore,
    private rest: RestService
  ) { }

  getTopics() {
    return new Promise((resolve, reject) => {
      let categorySubscribe = this.af.collection(Constant.COLLECTION.CATEGORIES).valueChanges().subscribe((data) => {
        resolve(data);
        categorySubscribe.unsubscribe();
      });
    });
  }

}
