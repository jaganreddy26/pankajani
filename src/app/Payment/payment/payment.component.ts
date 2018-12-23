import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { Payment } from '../../shared/entities/payment';

  import { from } from 'rxjs';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  PaymentFor:any=[];
  ReferenceIds:any=[];
  PaymentModes:any=[]
  PaymentReasons:any=[]
  PaymentTypes:any=[]
  ////==========base64formatedata Varibles=========////
base64textString:any;
FileName:any;
FileType:any;
  payment:any = new Payment();

  constructor(private paymentServive:PaymentService,private alertService :AlertService) {
  this.paymentServive.GetPaymentFor().subscribe((data:any)=>{ 
    this.PaymentFor=data;
 })
  this.payment.CompanyId=localStorage.getItem('businessId')
   }

  ngOnInit() {
  }
  
 

  onchangePaymentFor($event){
    this.payment.ObjectType=$event;
    let obj={
      'CompanyId':localStorage.getItem('businessId'),
      'ObjectType':this.payment.ObjectType
    }
    this.paymentServive.GetReferenceId(obj).subscribe((data:any)=>{
     
      this.ReferenceIds=data;
    })
    this.paymentServive.GetPaymentMode().subscribe((data:any)=>{
 
     this.PaymentModes=data;
    })
    this.paymentServive.GetPaymentReason().subscribe((data:any)=>{
    
      this.PaymentReasons=data;
    })
    this.paymentServive.GetPaymentType().subscribe((data:any)=>{
    
      this.PaymentTypes=data
    })
  }
  onchangeReferenceId($event){
    this.payment.ReferenceId=$event
    //console.log($event);
  }
  onchangePaymentModes($event){
    // console.log($event)
   this.payment.PaymentMode=$event;
  }
  onchangePaymentReasons($event){
   this.payment.PaymentReason=$event;
   // console.log($event);
  }
  onchangePaymentType($event){
    //console.log($event)
    this.payment.PaymentType=$event;
  }
  ///////////////////////////////////////////////////////////////
  save(){
console.log(this.payment);
this.payment="";
this.paymentServive.savePayment(this.payment).subscribe((data:any)=>{
  console.log(data);
  if (data !== 'null') {

    this.alertService.alert(AlertType.Success, data)
  } else {
    this.alertService.alert(AlertType.Error, "Something went wrong");
  }
})
}
///// 
handleFileSelect(evt){
  var File=evt.target.value;
   let subStringData=File.substr(12,27);
  var FileName = subStringData.split('.')[0];
  var FileType =subStringData.split('.')[1];
this.payment.FileDetails.UploadedFileName=FileName;
this.payment.FileDetails.FileExtn=FileType;
 var files = evt.target.files;
  var file = files[0];
  if (files && file) {
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
}
}

_handleReaderLoaded(readerEvt) {
 var binaryString = readerEvt.target.result;
      this.payment.FileDetails.EncryptedFile=btoa(binaryString);
      
        
}
}
