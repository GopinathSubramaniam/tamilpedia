import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppService } from 'src/app/helpers/app.service';
import { Constant } from 'src/app/helpers/constant';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedia-list',
  templateUrl: './pedia-list.component.html',
  styleUrls: ['./pedia-list.component.css']
})
export class PediaListComponent implements OnInit {

  pediaList: any[];

  constructor(
    private af: AngularFirestore,
    private app: AppService
  ) { }

  ngOnInit() {
    this.getPediaList();
  }

  getPediaList() {
    this.app.showSpinner();
    let userId = Constant.getUserId();
    let whereCondition = (ref => ref.where(Constant.SESSION_VARIABLE.USER_ID, '==', userId));
    let pediaSubscribe = this.af.collection(Constant.COLLECTION.PEDIA_HINT, whereCondition).valueChanges().subscribe((data: any) => {
      console.log('Pedia Data = ', data);
      this.pediaList = data;
      this.app.hideSpinner();
      pediaSubscribe.unsubscribe();
    });
  }


}
