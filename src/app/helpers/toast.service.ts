import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Label } from '../util/labels';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private msgService: MessageService) { }

  success(msg) {
    let lbl = Label.SUCCESS.TEXT;
    this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
  }

  error(msg) {
    let lbl = Label.ERROR.TEXT;
    this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
  }

  warn(msg) {
    let lbl = Label.WARN.TEXT;
    this.msgService.add({ severity: lbl.toLowerCase(), summary: lbl + ' Message', detail: msg });
  }

}
