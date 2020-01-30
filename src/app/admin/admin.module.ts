import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { PrimengComponentModule } from '../modules/primeng-component.module';
import { AdminRouterModule } from './admin-router.module';
import { PediaAddComponent } from './pedia-add/pedia-add.component';
import { PediaListComponent } from './pedia-list/pedia-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PediaListComponent,
    PediaAddComponent
  ],
  imports: [
    CommonModule,
    AdminRouterModule,
    PrimengComponentModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
