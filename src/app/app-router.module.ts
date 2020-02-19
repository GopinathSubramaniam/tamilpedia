import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuService } from './helpers/menu';

const appRoutes: Routes = MenuService.getMenu();

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
