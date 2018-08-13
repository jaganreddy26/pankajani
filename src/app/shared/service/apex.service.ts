import { Injectable, Output, EventEmitter, Component } from '@angular/core';//injectable represents it is a service
import { Observable } from 'rxjs';//observable from rxjs
import { DomSanitizer } from '@angular/platform-browser';//bypassSecurityTrust
import { AlertService } from '../alerts/_services/alert.service';//alerts service
import { Storage } from '../utils/storage';

import { AlertType } from '../alerts/_models/alert';

//service decorator
@Injectable()
export class ApexService {
    alerts: any = [];
     sessionUserEvent: EventEmitter<any>  = new EventEmitter( );
     menuEvent:  EventEmitter<any>  = new EventEmitter( );
     loaderEvent: EventEmitter<any>  = new EventEmitter( );
     contactEvent: EventEmitter<any>  = new EventEmitter( );
     contactId:any;

    constructor(private _domSanitizer: DomSanitizer , private alertService:AlertService){
    this.contactId =  localStorage.getItem('contactId')
    }
    showMessage(message: string){
      this.alertService.info(message)
    }
     showLoader(show: Boolean) {
             this.loaderEvent.next(show);
    }

   sessionUserEmit (sessionUser: any) {
       Storage.setSessionUser(sessionUser);
        this.sessionUserEvent.emit(sessionUser);
    }
    menuEmit(menu: any){
         this.menuEvent.emit(menu);
    }
    bypassURL(url: string){
        return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
    contactEmit(contactId:any){
        this.contactEvent.emit(this.contactId)
    }
  
}