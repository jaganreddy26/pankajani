import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProposalServiceService {
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
  getSeekProposals(data){
    this.url=this.host+'/api/UbtApi/GetSeekProposals';
    return this.http.post(this.url,data)
  }
  getVendor(data){
    this.url =this.host+'/api/UbtApi/GetVendor';
    return this.http.post(this.url,data);
  }
  addProposal(data){
    this.url=this.host+'/api/UbtApi/AddInfoToAnOpenCategory';
    return this.http.post(this.url,data);
  }
  getProposalsDetailsByProposalId(data){
    this.url=this.host+'/api/UbtApi/GetProposalsDetails';
    return this.http.post(this.url,data);
  }
  addProposalByProposalId(data){
    this.url=this.host+'/api/UbtApi/AmendProposal';
    return this.http.post(this.url,data);
  }
  getProposalDetailsForEdit(data){
  this.url=this.host+'/api/UbtApi/GetIndividualProposalTransporter';
  return this.http.post(this.url,data);
  }
  updateIndividualProposalDetails(data){
    this.url=this.host+'/api/UbtApi/EditIndividualProposalTransporter';
    return this.http.post(this.url,data);
  }
  discaredProposal(data){
    this.url=this.host+'/api/UbtApi/ChangeProposalStatus';
    return this.http.post(this.url,data);
  }
  approveAndSendProposal(data){
    this.url=this.host+'/api/UbtApi/ChangeProposalStatus';
    return this.http.post(this.url,data);
  } 
}
