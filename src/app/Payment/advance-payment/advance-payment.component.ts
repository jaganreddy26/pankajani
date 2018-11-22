import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { element } from 'protractor';
@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.css']
})
export class AdvancePaymentComponent implements OnInit {
  WOIds:any=[];
  SelectedWOId:any;
  Amount:any;
  Remarks:any;
  addedAdvancePayments:any=[];
    constructor(private paymentServive:PaymentService,private alertService :AlertService) {
    let obj={
      "CompanyId":localStorage.getItem('businessId'),
      "ObjectType":'WO'
    }
    this.paymentServive.getWoId(obj).subscribe((data:any)=>{
     // console.log(data);
      this.WOIds=data;
    })
   }

  ngOnInit() {
  }

  add(){
let obj={
  "Id":this.SelectedWOId,
  "Type":'PERMISSION',
  "Amount":this.Amount,
  "Remarks":this.Remarks
  
}
this.addedAdvancePayments.push(obj);
this.Amount="";
this.Remarks="";
this.SelectedWOId="";
  }
  save(){
   let addedArrany:any=[]
   this.addedAdvancePayments.forEach(element=>{
     addedArrany.push({
      "CompanyId":localStorage.getItem('businessId'),
      "Id":element.Id,
      "Type":element.Type,
      "Amount":element.Amount,
      "Remarks":element.Remarks
     })
   })
console.log(addedArrany)
this.paymentServive.savePostAdvancePayment(addedArrany).subscribe((data:any)=>{
  console.log(data);
  if(data=='Success'){
    this.alertService.alert(AlertType.Success,"Record Added Successfully" )
    }
    else if(data=='ERROR')
    {
      this.alertService.alert(AlertType.Error,"Records Addding is Failed");
    }
    else
    {
      this.alertService.alert(AlertType.Error,"Recrods are Duplicated");
    }
})
this.addedAdvancePayments=[];
  }
  delete(items){
    let index = this.addedAdvancePayments.indexOf(items);
    this.addedAdvancePayments.splice(index,1);
  }
  onchangeWoid($event){
    this.SelectedWOId=$event;
  }

}
