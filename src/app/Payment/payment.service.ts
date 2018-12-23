import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }

  // EXPENSES  GetPermissionId
  getGetPermissionId(data){
    this.url=this.host+'/api/PaymentApi/GetPermissionId';
    return this.http.post(this.url,data);
  }
  //SAVE PostExpenses
  savePostExpenses(data){
    this.url=this.host+'/api/PaymentApi/PostExpenses';
    return this.http.post(this.url,data);
  }

  // ADVANCE PAYMENT GetWoId

  getWoId(data){
    this.url=this.host+'/api/PaymentApi/GetWOId';
    return this.http.post(this.url,data);
  }

  // SAVE PostAdvancePayment
  savePostAdvancePayment(data){
    this.url=this.host+'/api/PaymentApi/PostAdvancePayment';
    return this.http.post(this.url,data);
  }
 /////////// PAYMENT PAGE /////////////
 GetPaymentFor(){
  this.url=this.host+'/api/PaymentApi/GetPaymentFor';
  return this.http.get(this.url);
 } 
 //GetReferenceId
 GetReferenceId(data){
  this.url=this.host+'/api/PaymentApi/GetReferenceId';
  return this.http.post(this.url,data);
 }
 //GetPaymentMode
 GetPaymentMode(){
  this.url=this.host+'/api/PaymentApi/GetPaymentMode';
  return this.http.get(this.url);
 }
 //GetPaymentReason
 GetPaymentReason(){
  this.url=this.host+'/api/PaymentApi/GetPaymentReason';
  return this.http.get(this.url);
 }
 //GetPaymentType
 GetPaymentType(){
  this.url=this.host+'/api/PaymentApi/GetPaymentType';
  return this.http.get(this.url);
 }
 //savePayment
 savePayment(data){
  this.url=this.host+'/api/PaymentApi/SavePayment';
  return this.http.post(this.url,data);
 }
}
