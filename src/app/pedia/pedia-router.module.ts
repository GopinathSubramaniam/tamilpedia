import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuService } from '../helpers/menu';

const routes: Routes = MenuService.getPediaMenu();

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PediaRouterModule { }
