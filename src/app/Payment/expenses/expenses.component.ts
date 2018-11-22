import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  PermissionIds:any=[];
  SelectedPermissionId:any;
  Reason:any;
  Amount:any;
  addedExpenses:any=[];
  constructor(private paymentServive:PaymentService,private alertService :AlertService) {
    let obj={
      "ObjectType":'PERMISSION',
      "CompanyId":localStorage.getItem('businessId'),
    }
    this.paymentServive.getGetPermissionId(obj).subscribe((data:any)=>{
     // console.log(data);
      this.PermissionIds=data;
    })
   }

  ngOnInit() {
  }
  add(){
  let obj={
    "PermissionId":this.SelectedPermissionId,
    "Reason":this.Reason,
    "Amount":this.Amount
  }
 // console.log(obj);
  this.addedExpenses.push(obj);
  this.SelectedPermissionId="";
  this.Reason="";
  this.Amount="";
  }

  save(){
    let addedDetails:any=[]
   this.addedExpenses.forEach(element => {
     addedDetails.push({
      "PermissionId":element.PermissionId,
      "Reason":element.Reason,
      "Amount":element.Amount
     })
   });
   console.log(addedDetails);
    let object={
      "CompanyId":localStorage.getItem('businessId'),
      "Expenses":addedDetails
    }
    console.log(object);
this.paymentServive.savePostExpenses(object).subscribe((data:any)=>{
  //console.log(data);
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
    this.addedExpenses=[];
  }


  delete(items){
    let index = this.addedExpenses.indexOf(items);
    this.addedExpenses.splice(index,1);
  }
  onchangePermissionId($event){
    this.SelectedPermissionId=$event;
   // console.log(this.SelectedPermissionId);
  }

}
