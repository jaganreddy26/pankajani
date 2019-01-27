import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';
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
  allsuppliedQuantity:any;
  InvoiceNO:any;
  ACcountNumber:any;
  //Date functions
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  buyersPoDateChanged:any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  InvoiceDate:any= new Date();
  value:any;
  url:any;
    constructor(private invoiceservice:InvoiceService,private alertService :AlertService,private dialog: MatDialog,private domSanitizer:DomSanitizer) {
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
      //this.ACcountNumber=data.BankDetails[0].AcNo;
      this.InvoicePath=data.InvoicePath;
      this.PermissionData = data.PermissionData;
      this.CustomerDetails=data.PlantDetails;
      this.UBTdata=data.UBT;
      let array =[];
      this.PermissionData.forEach(element => {
        array.push( element.SuppliedQty)
      });
      
      //console.log(array)
      for (var i = 0, sum = 0; i < array.length; sum += array[i++]);
   this.allsuppliedQuantity=sum;
    })
  
  }
  Save(){
    let object={      
             "CompanyId":localStorage.getItem('businessId'),
             "InvoiceId":this.InvoiceNO,
             "PermissionId":this.PermissionId,
             "InvoiceQty":this.allsuppliedQuantity,
             "AcNo":this.ACcountNumber,
             "CustomerId":this.UBTdata.CustomerId,
             "GoodsId":this.UBTdata.GoodsType,
             "InvoiceDate":this.InvoiceDate,
             "InvoicePath":this.InvoicePath
    }
    // console.log(object);
    this.invoiceservice.SaveAInvoice(object).subscribe((data:any)=>{
      console.log(data);
      if(data){
        this.alertService.alert(AlertType.Success,"Invoice Created Successfuly with id :"+ data)
        }else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
    })
    this.InvoiceDate="";
    this.InvoiceNO="";
    this.allsuppliedQuantity="";
  }
  onchangePermissionId($event){
this.PermissionId=$event;
this.Show=1;
//console.log(this.PermissionId);
this.GetInvoiceData();
  }
  download(items,template){
    console.log(items)
    this.dialog.open(template);
   this.url =this.domSanitizer.bypassSecurityTrustResourceUrl(items.FilePath);
    // const a = document.createElement('a');
    // a.setAttribute('style', 'display:none;');
    // document.body.appendChild(a);
    // a.href = url;
    //  a.target = "_blank"
    // a.download = 'data.txt';
    // a.click();
    // console.log(url)
  }
  fromDateChange() {
    this.fromDateChanged = true;
    this.FromDate.toLocaleDateString();
    var fromdate =
      this.FromDate.getFullYear() +
      "-" +
      (this.FromDate.getMonth() + 1) +
      "-" +
      this.FromDate.getDate();
    this.FromDate = fromdate;
  }
  toDateChange() {
    this.toDateChanged = true;
    this.ToDate.toLocaleDateString();
    var todate =
      this.ToDate.getFullYear() +
      "-" +
      (this.ToDate.getMonth() + 1) +
      "-" +
      this.ToDate.getDate();
    this.ToDate = todate;
  }
  invioceDate() {
    this.buyersPoDateChanged = true;
    this.InvoiceDate.toLocaleDateString();
    var buyersPoDate =
      this.InvoiceDate.getDate() +
      "-" +
      (this.InvoiceDate.getMonth() + 1) +
      "-" +
      this.InvoiceDate.getFullYear();
    this.InvoiceDate = buyersPoDate;
    console.log(this.InvoiceDate);
  }
}