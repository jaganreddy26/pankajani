import { Component, OnInit } from '@angular/core';
import {MasterService} from '../../MasterData/master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-paymentreason',
  templateUrl: './paymentreason.component.html',
  styleUrls: ['./paymentreason.component.css']
})
export class PaymentreasonComponent implements OnInit {
  status:any=[];
  ActiveStatus:any;
  Name:any;
  PaymentReasonDetails:any=[];
  InputId:any;
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) {
    this.GetStatus();
    this.getPaymentReasonDetails();
   }

  ngOnInit() {
  }
  Save(){
    let object ={
      "CompanyId":localStorage.getItem('businessId'),
      "Name":this.Name,
      "Status":this.ActiveStatus
    }
    this.masterService.savePaymentReasonDetails(object).subscribe((data:any)=>{
      console.log(data);
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data)
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
      }
      this.getPaymentReasonDetails();
    })
   
  }
  

  getPaymentReasonDetails(){
    let object ={
      "CompanyId":localStorage.getItem('businessId'),
      "Id":0
    }
    this.masterService.getPaymentReasonDetails(object).subscribe((data:any)=>{
      console.log(data);
      this.PaymentReasonDetails=data;
    })
  }

  GetStatus(){
    this.masterService.getStatus().subscribe((data:any)=>{
    //  console.log(data);
      this.status=data;
    })
  }
  onchangeStatus($event){
    if($event=='true'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
  }
  //////////////
  openModalEdit(item,template){
    this.dialog.open(template);
    let object={
      "CompanyId":item.CompanyId,
      "Id":item.Id
    }
    // console.log(object);
    this.InputId =object;
  }
  onHide() {
   
    this.dialog.closeAll();
    this.getPaymentReasonDetails();
  
  }
}
