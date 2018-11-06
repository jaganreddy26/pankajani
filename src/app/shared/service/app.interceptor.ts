import { Injectable } from '@angular/core'; //injectable represents it is a service
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'; //to do http calls we have import this one
// import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { ApexService } from './apex.service';//it is own service form the loader
import { Observable } from 'rxjs';// it is a observable
import { environment } from '../../../environments/environment';
import { Storage } from '../utils/storage';
import { AppService } from './app.service';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { AlertService } from '../alerts/_services/alert.service';
import { AlertType } from '../alerts/_models/alert';
// import { LogoutService } from './logout.service';
import {EMPTY} from 'rxjs';




@Injectable()

export class AppInterceptor implements HttpInterceptor {
  // CONTENT_TYPE = 'application/x-www-form-urlencoded';
  CONTENT_TYPE = "application/json"; //content type of the api should be json
  content = null;
  private host = environment.API_END_POINT;
  sessionUser: any;
  error: any;
  constructor(private apexService: ApexService,private appService:AppService,private alertService:AlertService) {
    this.sessionUser = Storage.getSessionUser();
    //console.log(this.sessionUser)
      // console.log(this.adal5Service.userInfo)
      
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(this.sessionUser)
    //console.log(localStorage.getItem('token'))
    

  if(request.url == this.host+'/TOKEN'){
    request = request.clone({
      setHeaders: { 
        'Content-Type':'application/x-www-form-urlencoded',
        // 'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
  }
   else{    
    request = request.clone({
      setHeaders: {  //headers in http request
        'Content-Type': this.CONTENT_TYPE,
        'Authorization': `JWT ${localStorage.getItem('access_token')}`,
      }
    });
  
  }
return next.handle(request)
.pipe(catchError((err: HttpErrorResponse) => {

  if (err.error instanceof Error) {
  this.apexService.showLoader(false);
    // A client-side or network error occurred. Handle it accordingly.
    // console.log('An error occurred:', err.error.message);
    if(err.status === 401){
      this.alertService.alert(AlertType.Error,"Unauthorized")
      //this.appService.navigate('',[])
      setTimeout(() => {
        // this.logoutService.signout();
     }, 6000);
    }else{
      this.alertService.alert(AlertType.Error,'An error occurred:'+err.error.message)
    }
  } else {
  this.apexService.showLoader(false);
  if(err.status === 401){
    this.alertService.alert(AlertType.Error,"Unauthorized")
  setTimeout(() => {
  //  this.logoutService.signout();
}, 6000);
    // this.appService.navigate('',[])
    // location.reload(true)
  }
  }


  return EMPTY;
})) as any;
}
  //   return next.handle(request).map(
  //     (resp: HttpResponse<any>) => {
      
  //       if (resp && resp.type == 4) {
  //         this.apexService.showLoader(false);
  //         if (resp.body) {
  //           console.log(resp.body)
  //           if (resp.body.status == 1) {
  //             return resp.clone({
  //               body: resp.body.data
  //             });
             
  //           }
  //           if (resp.body.error){
  //             console.log(resp.body.error);
  //           }
  //            else if (resp.body.status == 0) {
  //             // this.errorMessage(resp.body.error);
  //             console.log(resp.body.error);
  //           }
           
  //             else {
  //             return resp;
  //           }
  //         } else {
  //           return resp;
  //         }
  //       }
       
  //     }).catch(this.handleError)
    

  
     
  // }


// private handleError(error:Response){
 
//   if(error.status === 401){
//     console.log(error.status);
//     this.error = error.status;
//     console.log(this.error)
   
  
//   }
//   this.errorMessage()
//   return Observable.throw(error)
 
// }
  // public getToken(): string {
  //   return 'abcd';
  // }
  // errorMessage() {
  //   if(this.error === 401){
  //     this.alertService.alert(AlertType.Error,'Unauthorized')
  //   }else{

  //   }
  
    //this.appService.navigate('',[])
    //  console.log(err);
    // const message: any = err.message ? err.message : err;
    // console.log(message);
  }