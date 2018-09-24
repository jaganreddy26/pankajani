import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }

  // PO ID
  getPoId(){
    this.url =this.host+'/api/UbtApi/GetPOId';
    return this.http.get(this.url);
  }
  // VENDOR TYPE
  getVendorType(){
    this.url =this.host+'/api/UbtApi/GetVendorType';
    return this.http.get(this.url);
  }
  // VENDOR NAME
  getVendorName(data){
    this.url=this.host+'/api/UbtApi/GetVendorUsingType';
    return this.http.post(this.url,data);
  }
  // SAVE SEEK OFFER
  saveSeekOfferDetails(data){
    this.url=this.host+'/api/UbtApi/SeekOffer';
    return this.http.post(this.url,data);
  }

  // VENDOR NAME USED IN CREATE OFFER PAGE

  getVendorNameforCreateOffer(data){
    this.url=this.host+'/api/UbtApi/GetVendorUsingPOType';
    return this.http.post(this.url,data);
  }
  // SAVE CREATE OFFER
  saveCreateOffer(data){
    this.url=this.host+'/api/UbtApi/CreateOffer';
    return this.http.post(this.url,data);
  }
}
