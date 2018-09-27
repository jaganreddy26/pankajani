import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
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
  // GetWOSelection
  getWoSelection(data){
    this.url = this.host+'/api/UbtApi/GetWOSelection';
    return this.http.post(this.url,data)
  }
  // CreateWorkOrderId
  createWorkOrder(data){
    this.url= this.host+'/api/UbtApi/PostCreateWO';
    return this.http.post(this.url,data);
  }
  // VIEW WORK ORDER
  viewWorkOrderDetails(data){
    this.url= this.host+'/api/UbtApi/GetWODetails';
    return this.http.post(this.url,data);
  }
  // update Details
  updateWorkOrderDetails(data){
    this.url= this.host+'/api/UbtApi/AmendWO';
    return this.http.post(this.url,data);
  }
  // Approve WO
  approveWorkOrder(data){
    this.url= this.host+'/api/UbtApi/ChangeWOStatus';
    return this.http.post(this.url,data);
  }

}
