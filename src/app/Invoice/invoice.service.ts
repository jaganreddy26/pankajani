import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private host = environment.API_END_POINT;
  private url: string = '';
  constructor(private http:HttpClient) { }
  GetPermissionId(data)
  {
 
    this.url = this.host+'/api/PaymentApi/GetPermissionId';
    return this.http.post(this.url,data)
  }
    //GET GET INVOICE DATA
    GetInvoiceData(data){
      this.url = this.host+'/api/PaymentApi/GetInvoiceData';
      return this.http.post(this.url,data)
    }
    //SAVE A INVOICE
    SaveAInvoice(data){
      this.url = this.host+'/api/PaymentApi/PostInvoice';
      return this.http.post(this.url,data)
    }
}
