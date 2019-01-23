import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UbtService {
   BusinessId:any =localStorage.getItem('businessId');
  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }
//Get customers in create ubt
  getCustomer(data)
  {
    // var data = {BusinessId:this.BusinessId } ;
    this.url = this.host+'/api/UbtAPI/GetCustomers';
    return this.http.post(this.url,data)
  }
  getCustomerName()
  {
     var data = {BusinessId:this.BusinessId } ;
    this.url = this.host+'/api/UbtAPI/GetCustomers';
    return this.http.post(this.url,data)
  }
  //old one Get Agency
  getAgency(Id:any){
    var data = {CustomerId:Id } ;
    this.url=this.host+'/api/UbtApi/GetAgency';
    return this.http.post(this.url,data)
  }
  // New one  Get Agency by CustomerId
  getAgencyByCustomerId(data){
    this.url=this.host+'/api/UbtAPI/GetAgency';
    return this.http.post(this.url,data)
  }
   //old one getGoodsType
  getGoodsType(Id:any){
    var data = {CustomerId:Id } ;
    this.url=this.host+'/api/UbtApi/GetGoodsType';
    return this.http.post(this.url,data)
  }
    // New one  getGoodsType by CustomerId
    getGoodsTypeByCustomerId(data){
      this.url=this.host+'/api/UbtAPI/GetGoodsType';
    return this.http.post(this.url,data)
    }
    //old one getCategoryName
  getCategoryName(Id:any){
    var data = {CustomerId:Id};
    this.url =this.host+'/api/UbtApi/GetCategory';
    return this.http.post(this.url,data);
  }
   // New one  getCategoryName by CustomerId
   getCategoryNameByCustomerId(data){
    this.url=this.host+'/api/UbtAPI/GetCategory';
  return this.http.post(this.url,data)
  }
  CreateUbt(data){
     this.url=this.host+'/api/UbtAPI/CreateUBT';
     return this.http.post(this.url,data);
  }
  getViewUbtDetails(data){
    this.url =this.host+'/api/UbtAPI/GetUBT';
    return this.http.post(this.url,data);
  }
  getIndividualUbt(data){
    this.url=this.host+'/api/UbtApi/GetIndividualUBT';
    return this.http.post(this.url,data)
  }
  getIndividualUBTCategoryDetails(data){
    this.url=this.host+'/api/UbtApi/GetIndividualUBTCategoryDetails';
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
  addNewCategoryToUbtId(data){
    this.url=this.host+'/api/UbtApi/AmendUbt';
    return this.http.post(this.url,data);
  }
  //*****Delete operation in Amend Ubt component*****//
  deleteCategoryId(data){
    this.url=this.host+'/api/UbtAPI/DeleteIndividualUBTCategory';
    return this.http.post(this.url,data);
  }
  confirmBidding(data){
    this.url=this.host+'/api/UbtApi/ConfirmBidding';
    return this.http.post(this.url,data);
  }
  


  // ProposalID Based DATA API //
  getProposalsDetailsByProposalId(data){
    this.url=this.host+'/api/UbtApi/GetProposalsDetails';
    return this.http.post(this.url,data);
  }

}
