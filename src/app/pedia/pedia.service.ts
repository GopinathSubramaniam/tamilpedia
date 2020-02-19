import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Constant } from '../helpers/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PediaService {

  constructor(private af: AngularFirestore, ) { }

  searchPedias(searchText) {
    return new Promise((resolve, reject) => {
      searchText = searchText ? searchText : '';
      let splittedTags = searchText.toLowerCase().split(',');
      let tags = [];
      splittedTags.forEach((tag: any) => { tags.push(tag.trim()); });
      let whereCondition = (ref => ref.orderBy('createdAt'));
      if (tags.length > 0 && tags[0]) {
        whereCondition = (ref => ref.where('tags', 'array-contains-any', tags).limit(100));
      }
      let pediaSubscribe = this.af.collection(Constant.COLLECTION.PEDIA_HINT, whereCondition).snapshotChanges()
        .pipe(map(actions => actions.map((a: any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          data.id = id;
          return data;
        }))).subscribe((data: any) => {
          console.log('Pedia Data = ', data);
          resolve(data);
          pediaSubscribe.unsubscribe();
        });
    });
  }

  getPediaListByUserId() {
    return new Promise((resolve, reject) => {
      let userId = Constant.getUserId();
      let whereCondition = (ref => ref.where(Constant.SESSION_VARIABLE.USER_ID, '==', userId));
      let pediaSubscribe = this.af.collection(Constant.COLLECTION.PEDIA_HINT, whereCondition).snapshotChanges()
        .pipe(map(actions => actions.map((a: any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          data.id = id;
          return data;
        })))
        .subscribe((data: any) => {
          console.log('Pedia Data = ', data);
          pediaSubscribe.unsubscribe();
          resolve(data);
        });
    });
  }
}
