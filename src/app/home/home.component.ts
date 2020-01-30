import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topics: TreeNode[];
  constructor(private route: Router, private appSer: HomeService) { }

  ngOnInit() {
    this.appSer.getTopics().then(res => {
      console.log('Res = ', res);
      this.topics = res;
    }).catch((err: any) => {
      console.log('Err = ', err);
    });
  }

  selectNode(data) {
    console.log('Data = ', data);
    this.route.navigate(['/pedia']);
  }

}
