import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Label } from '../util/labels';

@Injectable({
   providedIn: 'root'
})
export class AppService {

   constructor(
      private msgService: MessageService,
      private spinner: NgxSpinnerService
   ) { }

   showSuccessToast(msg) {
      let lbl = Label.SUCCESS.TEXT;
      this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
   }

   showErrorToast(msg) {
      let lbl = Label.ERROR.TEXT;
      this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
   }

   showWarnToast(msg) {
      let lbl = Label.WARN.TEXT;
      this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
   }

   showSpinner() {
      this.spinner.show();
   }

   hideSpinner() {
      this.spinner.hide();
   }


}
