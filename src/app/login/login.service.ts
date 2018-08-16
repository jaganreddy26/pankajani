import { Injectable } from '@angular/core';//injectable represents it is a service
import { HttpClient } from '@angular/common/http';//to do http calls we have to import httpclient from angularhttp
import { AppService } from '../shared/service/app.service';//it is own service for navigate and getting parameters
import { environment } from '../../environments/environment';//to get base url to connect the server


//service decotator
@Injectable()
export class LogiinInService {
    sessionUser:any;
  //base host in api
  private host = environment.API_END_POINT;
  //url
  private url: string = '';

  constructor(private http: HttpClient, private appService: AppService) { 

  }
  login(UserName,Password){
    var data = "grant_type=password&username="+ UserName + "&password=" + Password ;
    this.url = this.host+'/TOKEN';
    return this.http.post(this.url,data);
  }
 
  storageSave(data: any){
    if(data.jwt){
        // Storage.setJWT(data.jwt);
    }
    if(data.loginResponse.contactId) {
        // Storage.contactId(data.loginResponse.contactId);
        // this.appService.getContactId(data.response.loginResponse.contactid);
    }
    if(data.loginResponse.organizationid) {
        // Storage.organizationId(data.loginResponse.contactId);
        // this.appService.getOrganizationId(data.response.loginResponse.organizationid);
    }
    if(data.branch) {
        // Storage.setBranch(data.branch);
    }
 }
 canActivate(){
    // this.sessionUser = Storage.getSessionUser();
    // if(this.sessionUser){
    //     return true;
    // }else{
    //     this.appService.navigate('',[])
    //     return false;
    // }

 }

 getBusinessName(){
     console.log('hii')
     this.url = this.host+'/api/DefaultApi/GetBusinessName';
     return this.http.get(this.url)
 }




}

