import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/helpers/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppService } from 'src/app/helpers/app.service';
import { map } from 'rxjs/operators';
import { PediaService } from '../pedia.service';

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
    private app: AppService,
    private pediaService: PediaService
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
    this.pediaService.searchPedias(this.searchText).then((data: any) => {
      this.pediaList = data;
      this.app.hideSpinner();
    });
  }

}
