import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TreeModule,
    EditorModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    TreeModule,
    EditorModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    ToastModule
  ]
})
export class PrimengComponentModule { }
