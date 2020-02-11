import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HomeService } from './home.service';
import { AppService } from '../helpers/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topics: TreeNode[];
  constructor(
    private route: Router,
    private homeService: HomeService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.showSpinner();
    this.homeService.getTopics().then((res: TreeNode[]) => {
      this.appService.hideSpinner();
      this.topics = res;
    }).catch((err: any) => {
      console.log('Err = ', err);
      this.appService.hideSpinner();
    });
  }

  selectNode(data) {
    console.log('Data = ', data);
    let node = data.node;
    if (node && node.value) {
      this.route.navigate(['/pedia/list/' + node.value]);
    } else {
      this.route.navigate(['/pedia']);
    }
  }

}
