import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/helpers/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppService } from 'src/app/helpers/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  searchText: string;
  paramSubscribe: Subscription;
  pediaList: any[];

  constructor(
    private af: AngularFirestore,
    private route: ActivatedRoute,
    private app: AppService
  ) { }

  ngOnInit() {
    this.paramSubscribe = this.route.paramMap.subscribe(params => {
      this.searchText = params.get('searchText');
      console.log('Search Text = ', this.searchText);
      this.searchPedias();
    });
  }

  ngOnDestroy(): void {
    console.log('Destroy called');
    this.paramSubscribe.unsubscribe();
  }

  searchPedias() {
    this.app.showSpinner();
    let whereCondition = (ref => ref.orderBy('category').startAt(this.searchText));
    /* .where('content', '>=', this.searchText)
    .where('title', '>=', this.searchText)); */
    let pediaSubscribe = this.af.collection(Constant.COLLECTION.PEDIA_HINT, ref => ref.orderBy('category').startAt(this.searchText)).valueChanges().subscribe((data: any) => {
      console.log('Pedia Data = ', data);
      this.pediaList = data;
      this.app.hideSpinner();
      pediaSubscribe.unsubscribe();
    });
  }

}
