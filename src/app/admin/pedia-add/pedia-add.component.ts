import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pedia-add',
  templateUrl: './pedia-add.component.html',
  styleUrls: ['./pedia-add.component.css']
})
export class PediaAddComponent implements OnInit {
  
  constructor(
    private spinner: NgxSpinnerService,
    private af: AngularFirestore
  ) { }

  ngOnInit() {
    this.getPediaList();
  }

  getPediaList() {
    this.spinner.show();
    /* this.af.collection(Constant.COLLECTION.PEDIAS).add({}).then((res: any) => {
      console.log('Res = ', res);
      this.spinner.hide();
    }); */
  }

}
