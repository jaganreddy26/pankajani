import { Component, OnInit } from '@angular/core';
import {UbtService} from '../ubt.service'
@Component({
  selector: 'app-amendubt',
  templateUrl: './amendubt.component.html',
  styleUrls: ['./amendubt.component.css']
})
export class AmendubtComponent implements OnInit {
  customer:any=[]
  FromDate:any = new Date();
  ToDate:any = new Date();
  Id:any;
  businessId:any;
  customerId:any;
  fromDateChanged:boolean = false;
  toDateChanged:boolean = false;
  amendUbtIds:any=[];
  constructor(private ubtService:UbtService) { 
    this.getCustomer();
  }

  ngOnInit() {
  }
  getCustomer(){
    this.ubtService.getCustomerName().subscribe((data:any)=>{
    console.log(data);
      this.customer=data;
    })
  }
  search(){
    this.businessId=this.ubtService.BusinessId;
    this.customerId=this.Id;
    //console.log(this.customerId);
    if(this.fromDateChanged == false){
      this.FromDate.toLocaleDateString();
      var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
      this.FromDate = fromdate;
    }
    if(this.toDateChanged == false){
      this.ToDate.toLocaleDateString();
      var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
      this.ToDate = todate;
    }


    let object = {
      'BusinessId':this.businessId,
      'CustomerId':this.customerId,
      'FromDate':this.FromDate,
      'ToDate':this.ToDate,
      
    }
    this.ubtService.getAmendUbtDetails(object).subscribe((data:any)=>{
     console.log(data);
       this.amendUbtIds= data;
       
     })
   
  }

  edit(){
    console.log(this.customerId)
  }

  onchange($event){
    this.Id=$event
    }
    fromDateChange(){
this.fromDateChanged = true;
this.FromDate.toLocaleDateString();
var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
this.FromDate = fromdate;
    }
    toDateChange(){
      this.toDateChanged = true;
      this.ToDate.toLocaleDateString();
      var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
      this.ToDate = todate;
    }


}
