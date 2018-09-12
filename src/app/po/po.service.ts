import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PoService {
  BusinessId:any =3;
  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }

  GetStatus(data){
    this.url =this.host+'/api/UbtApi/GetStatus';
    return this.http.post(this.url,data);
  }
  getCustomerName()
  {
    var data = {BusinessId:this.BusinessId } ;
    this.url = this.host+'/api/UbtApi/GetCustomers';
    return this.http.post(this.url,data)
  }
  getUbtIds(data)
  {
    // var data = {BusinessId:this.BusinessId } ;
    this.url = this.host+'/api/UbtApi/GetUBT';
    return this.http.post(this.url,data)
  }
  getSeekPOSelection(data){
    this.url=this.host+'/api/UbtApi/GetSeekPOSelection';
    return this.http.post(this.url,data)
  }
  saveSeekPOSelection(data){
    this.url=this.host+'/api/UbtApi/PostCreatePurchaseOrder';
    return this.http.post(this.url,data);
  }
  // View individual PO
  getPoDetailsByPoId(data){
    this.url=this.host+'/api/UbtApi/GetPODetails';
    return this.http.post(this.url,data);
  }
  //AmendPo
  getAmendPoDetails(data){
    this.url =  this.host+'/api/UbtApi/GetAmendPO';
    return this.http.post(this.url,data);
  }
  //AmendPoSave
  updateandSaveamendPoDetails(data){
    this.url=this.host+'/api/UbtApi/PostAmendPurchaseOrder';
    return this.http.post(this.url,data);
  }
}
