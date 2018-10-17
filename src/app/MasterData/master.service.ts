import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/service/app.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private host = environment.API_END_POINT;
  //url
  private url: string = '';
  constructor(private http: HttpClient) { }
  
  getCompanyId(data:any){
    this.url = this.host+'/api/UbtApi/GetCustomers';
    return this.http.post(this.url,data)
  }
  // SAVING BANK INFORMATION
  saveBankDetails(data){
    this.url = this.host+'/api/MasterDataApi/PostBankDetails';
    return this.http.post(this.url,data)
  }
  //getBusinessId
  getBusinessId(){
    this.url = this.host+'/api/DefaultApi/GetBusinessName';
     return this.http.get(this.url)
  }
  // SAVING PLANT INFORMATION
  savePlantDetails(data){
    this.url = this.host+'/api/MasterDataApi/PostPlantDetails';
    return this.http.post(this.url,data)
  }
}
