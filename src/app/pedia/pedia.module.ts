import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { PediaRouterModule } from './pedia-router.module';


@NgModule({
  declarations: [
    DetailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PediaRouterModule
  ]
})
export class PediaModule { }
