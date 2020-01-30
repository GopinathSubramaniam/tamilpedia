import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PediaAddComponent } from './pedia-add/pedia-add.component';
import { PediaListComponent } from './pedia-list/pedia-list.component';

const routes: Routes = [
  { path: '', component: PediaListComponent },
  { path: 'add', component: PediaAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouterModule { }
