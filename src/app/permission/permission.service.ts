import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
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
  // Get Transporter, loading contractor, unloading contractor Details
  getTransporterLoadingContractorUnLoadingContractorDetails(data){
    this.url=this.host+'/api/UbtApi/GetVendorForPermission';
    return this.http.post(this.url,data);
  }
  getSeekPermissionDetailsByPoId(data){
    this.url=this.host+'/api/UbtApi/GetSeekPermissionSelection';
    return this.http.post(this.url,data);
  }
  createPermissionByPoid(data){
    this.url=this.host+'/api/UbtApi/PostCreatePermission';
    return this.http.post(this.url,data);
  }
  // getVendor(data){
  //   this.url =this.host+'/api/UbtApi/GetVendor';
  //   return this.http.post(this.url,data);
  // }
  getPermissionDetailsByPermissionId(data){
    this.url= this.host+'/api/UbtApi/GetPermissionDetails';
    return this.http.post(this.url,data)
  }
  addNewTransporterDetailsToPermissionId(data){
    this.url= this.host+'/api/UbtApi/AmendPermission';
    return this.http.post(this.url,data)
  }
  // SINGLE PERMISSION SELECTION FOR EDIT
  editPermissionSelectionOfIndividual(data){
    this.url= this.host+'/api/UbtApi/GetIndividualPermissionTransporter';
    return this.http.post(this.url,data)
  } 
  // SAVE INDIVIDUAL PERMISSION TRANSPORTER
  updateIndividualRecords(data){
    this.url =this.host+'/api/UbtApi/EditIndividualPermissionTransporter';
    return this.http.post(this.url,data)
  }
  deleteIndividualRecords(data){
    this.url =this.host+'/api/UbtApi/DeleteIndividualPermissionTransporter';
    return this.http.post(this.url,data)
  }
  // APPROVE & SEND PERMISSION
  approveAndSendPermission(data){
    this.url =this.host+'/api/UbtApi/ApprovePermissionStatus';
    return this.http.post(this.url,data)
  }
  // CONFIRM PERMISSION
  confirmPermission(data){
    this.url =this.host+'/api/UbtApi/ChangePermissionStatus';
    return this.http.post(this.url,data)
  }
   //GetCancelReason
   GetCancelReason(data){
    this.url=this.host+'/api/UbtApi/GetCancelReason';
    return this.http.post(this.url,data);
  }
  // GetCancelPermissionData
  GetCancelPermissionData(data){
    this.url =this.host+'/api/UbtApi/GetCancelPermissionData';
    return this.http.post(this.url,data)
  }
  //SAVE CANCEL ERMISSION
  SaveCancelPermission(data){
    this.url =this.host+'/api/UbtApi/SaveCancelPermission';
    return this.http.post(this.url,data)
  }
}
