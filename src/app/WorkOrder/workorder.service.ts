import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
  BusinessId:any =localStorage.getItem('businessId');
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
    //GetSplitReason
  GetSplitReason(){
      this.url=this.host+'/api/UbtApi/GetSplitReason';
      return this.http.get(this.url);
    }
      //GetSplitWOData
  GetSplitWOData(data){
    this.url=this.host+'/api/UbtApi/GetSplitWOData';
    return this.http.post(this.url,data);
  }
  //SAVE SPLIT WO
  saveSplitWo(data){
    this.url=this.host+'/api/UbtApi/SaveSplitWO';
    return this.http.post(this.url,data);
  }
     //GetCancelReason
     GetCancelReason(data){
      this.url=this.host+'/api/UbtApi/GetCancelReason';
      return this.http.post(this.url,data);
    }
  // GetCancelWOData
  getCancelWOData(data){
    this.url=this.host+'/api/UbtApi/GetCancelWOData';
    return this.http.post(this.url,data);
  }
  // SAVE CANCEL WORK ORDER
  saveCancelWorkOrder(data){
    this.url=this.host+'/api/UbtApi/SaveCancelWO';
    return this.http.post(this.url,data);
  }
}
