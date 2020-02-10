import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TreeModule,
    EditorModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    ToastModule,
    AutoCompleteModule,
    ListboxModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    TreeModule,
    EditorModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    ToastModule,
    AutoCompleteModule,
    ListboxModule,
    DropdownModule
  ]
})
export class PrimengComponentModule { }
