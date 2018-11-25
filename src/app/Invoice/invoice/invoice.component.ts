import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  PermissionIds:any=[];
  PermissionId:any;
  /////
  BankDetails:any=[];
  InvoicePath:any;
  PermissionData:any=[];
  CustomerDetails:any={};
  UBTdata:any={};
  Show:any;
  constructor(private invoiceservice:InvoiceService) {
this.GetPermissionIDs();
   }

  ngOnInit() {
  }
  GetPermissionIDs(){
    let object={
      "CompanyId":localStorage.getItem('businessId'),
      "ObjectType":'PERMISSION'
      }
    this.invoiceservice.GetPermissionId(object).subscribe((data:any)=>{
     // console.log(data);
      this.PermissionIds=data;
    })
  }
  //GET GET INVOICE DATA

  GetInvoiceData(){
    let object={
      "CompanyId":localStorage.getItem('businessId'),
      "PermissionId":this.PermissionId
    }
    this.invoiceservice.GetInvoiceData(object).subscribe((data:any)=>{
      //console.log(data);
      this.BankDetails=data.BankDetails;
      this.InvoicePath=data.InvoicePath;
      this.PermissionData=data.PermissionData;
      this.CustomerDetails=data.PlantDetails;
      this.UBTdata=data.UBT;
    })
  }

  onchangePermissionId($event){
this.PermissionId=$event;
this.Show=1;
//console.log(this.PermissionId);
this.GetInvoiceData();
  }

}
