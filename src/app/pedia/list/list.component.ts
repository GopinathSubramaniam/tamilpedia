import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {


  paramSubscribe: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscribe = this.route.paramMap.subscribe(params => {
      console.log('Params = ', params.get('searchText'));
    });
  }

  ngOnDestroy(): void {
    console.log('Destroy called');
    this.paramSubscribe.unsubscribe();
  }

}
