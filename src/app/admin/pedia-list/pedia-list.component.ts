import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppService } from 'src/app/helpers/app.service';
import { PediaService } from 'src/app/pedia/pedia.service';
@Component({
  selector: 'app-pedia-list',
  templateUrl: './pedia-list.component.html',
  styleUrls: ['./pedia-list.component.css']
})
export class PediaListComponent implements OnInit {

  pediaList: any[];

  constructor(
    private af: AngularFirestore,
    private app: AppService,
    private pediaService: PediaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPediaList();
  }

  getPediaList() {
    this.app.showSpinner();
    this.pediaService.getPediaListByUserId().then((data: any) => {
      this.pediaList = data;
      this.app.hideSpinner();
    });
  }

  openEditPedia(id) {
    this.router.navigate(['/admin/edit/' + id]);
  }


}
