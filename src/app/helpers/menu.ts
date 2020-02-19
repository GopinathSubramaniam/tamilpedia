import { Injectable } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuardService } from '../util/auth-guard.service';
import { ListComponent } from '../pedia/list/list.component';
import { DetailComponent } from '../pedia/detail/detail.component';
import { PediaListComponent } from '../admin/pedia-list/pedia-list.component';
import { PediaAddComponent } from '../admin/pedia-add/pedia-add.component';


@Injectable()
export class MenuService {

   constructor() { }

   static getMenu() {
      return [
         {
            name: 'Home',
            pathRef: '',
            path: '',
            component: HomeComponent
         },
         {
            path: 'register',
            component: RegisterComponent
         },
         {
            path: 'pedia',
            loadChildren: './pedia/pedia.module#PediaModule',
         },
         {
            path: 'admin',
            canActivate: [AuthGuardService],
            children: [
               {
                  path: '',
                  loadChildren: './admin/admin.module#AdminModule',
               }
            ]
         },
         { path: '**', component: HomeComponent }
      ];
   }

   static getPediaMenu() {
      return [
         { name: 'Pedia List', pathRef: '', path: '', component: ListComponent },
         { name: ':searchText', pathRef: 'list', path: 'list/:searchText', component: ListComponent },
         { name: 'Detail', pathRef: 'detail', path: 'detail/:key', component: DetailComponent }
      ];
   }

   static getAdminMenu() {
      return [
         { name: 'Pedia List', pathRef: '', path: '', component: PediaListComponent },
         { name: 'Add Pedia', pathRef: 'add', path: 'add', component: PediaAddComponent },
         { name: 'Edit Pedia', pathRef: 'edit', path: 'edit/:id', component: PediaAddComponent },
      ];
   }

   static getAllMenus() {
      let menu = this.getMenu();
      let adminMenus: any = this.getAdminMenu();
      let pediaMenus: any = this.getPediaMenu();
      menu = menu.concat(adminMenus);
      menu = menu.concat(pediaMenus);
      return menu;
   }
}