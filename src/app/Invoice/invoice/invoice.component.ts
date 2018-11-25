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
      this.PermissionData = data.PermissionData;
      this.CustomerDetails=data.PlantDetails;
      this.UBTdata=data.UBT;
      let array =[];
      this.PermissionData.forEach(element => {
        array.push( element.SuppliedQty)
      });
      console.log(array)
      for (var i = 0, sum = 0; i < array.length; sum += array[i++]);
      console.log(sum);
    })
  
  }

  onchangePermissionId($event){
this.PermissionId=$event;
this.Show=1;
//console.log(this.PermissionId);
this.GetInvoiceData();
  }
  download(items){
    console.log(items)
    
   let  url = items.FilePath;
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.href = url;
     a.target = "_blank"
    a.download = 'data.txt';
    a.click();
    console.log(url)
  }
}
