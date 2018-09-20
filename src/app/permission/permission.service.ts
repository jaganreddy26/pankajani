import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
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
  getSeekPermissionDetailsByPoId(data){
    this.url=this.host+'/api/UbtApi/GetSeekPermissionSelection';
    return this.http.post(this.url,data);
  }
  createPermissionByPoid(data){
    this.url=this.host+'/api/UbtApi/PostCreatePermission';
    return this.http.post(this.url,data);
  }
  getPermissionDetailsByPermissionId(data){
    this.url= this.host+'/api/UbtApi/GetPermissionDetails';
    return this.http.post(this.url,data)
  }
}
