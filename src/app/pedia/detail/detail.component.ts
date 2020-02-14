import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/helpers/app.service';
import { Constant } from 'src/app/helpers/constant';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  pediaKey: string;
  pediaDetail: object = {};

  constructor(
    private af: AngularFirestore,
    private route: ActivatedRoute,
    private app: AppService
  ) { }

  ngOnInit() {
    let paramSubscribe = this.route.paramMap.subscribe(params => {
      this.pediaKey = params.get('key');
      console.log('Search Text = ', this.pediaKey);
      this.getPediaDetail();
    });
    paramSubscribe.unsubscribe();
  }

  getPediaDetail() {
    this.app.showSpinner();
    this.af.collection(Constant.COLLECTION.PEDIA_MASTER).doc(this.pediaKey).get().toPromise().then((res) => {
      let obj = res.data();
      obj.id = res.id;
      this.pediaDetail = obj;
      this.app.hideSpinner();
    });
  }

}
