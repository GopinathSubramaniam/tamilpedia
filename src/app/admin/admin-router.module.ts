import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuService } from '../helpers/menu';

const routes: Routes = MenuService.getAdminMenu();

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouterModule { }
