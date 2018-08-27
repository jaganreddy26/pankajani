import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UbtService {
  BusinessId:any =3;
  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }

  getCustomerName()
  {
    var data = {BusinessId:this.BusinessId } ;
    this.url = this.host+'/api/UbtApi/GetCustomers';
    return this.http.post(this.url,data)
  }
  getAgency(Id:any){
    var data = {CustomerId:Id } ;
    this.url=this.host+'/api/UbtApi/GetAgency';
    return this.http.post(this.url,data)
  }
  getGoodsType(Id:any){
    var data = {CustomerId:Id } ;
    this.url=this.host+'/api/UbtApi/GetGoodsType';
    return this.http.post(this.url,data)
  }
  getCategoryName(Id:any){
    var data = {CustomerId:Id};
    this.url =this.host+'/api/UbtApi/GetCategory';
    return this.http.post(this.url,data);
  }
  CreateUbt(data){
     this.url=this.host+'/api/UbtAPI/CreateUBT';
     return this.http.post(this.url,data);
  }
  getViewUbtDetails(data){
    this.url =this.host+'/api/UbtApi/GetUBT';
    return this.http.post(this.url,data);
  }
  getIndividualUbt(data){
    this.url=this.host+'/api/UbtApi/GetIndividualUBT';
    return this.http.post(this.url,data)
  }
  getAmendUbtDetails(data){
    this.url=this.host+'/api/UbtApi/GetUBT';
    return this.http.post(this.url,data);
  }
  GetIndividualUbtDetails(data){
    this.url =this.host+'/api/UbtAPI/GetIndividualUbtDetails';
    return this.http.post(this.url,data);
  }
  GetStatus(data){
    this.url =this.host+'/api/UbtApi/GetStatus';
    return this.http.post(this.url,data);
  }
  getCloseUbtDetails(data){
    this.url=this.host+'/api/UbtApi/GetUBT';
    return this.http.post(this.url,data);
  }
  getIndividualUbtCategory(data){
    this.url=this.host+'/api/UbtApi/GetIndividualUbtCategory';
    return this.http.post(this.url,data);
  }
  updateIndividualUbtCategory(data){
    this.url=this.host+'/api/UbtApi/EditIndividualUBTCategory';
    return this.http.post(this.url,data);
  }
}
