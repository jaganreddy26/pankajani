import { Component, OnInit } from '@angular/core';
import { BankDetails } from '../../shared/entities/bankDetails';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert'
@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  CompanyId:any;
  BankName:any;
  BranchName:any;
  Location:any;
  AccountNumber:any;
  IFSCcode:any;
  AccountHolderName:any;
  DeafaultAc:any;
  CompanyIds:any=[];
  addedbankDetails:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) {
  let object={"BusinessId": 0}
  this.getCustomerId(object);
   }

  ngOnInit() {
  
  }
  add(){
let object={
"AcNo":this.AccountNumber,
"CompanyId":this.CompanyId,
"BankName":this.BankName,
"BranchName":this.BranchName,
"Location":this.Location,
"IFSC":this.IFSCcode,
"AcHolderName":this.AccountHolderName,
"DefaultAc":this.DeafaultAc

}
console.log(object);
this.addedbankDetails.push(object);
this.AccountNumber="";
this.CompanyId="";
this.BankName="";
this.BranchName="";
this.Location="";
this.IFSCcode="";
this.AccountHolderName="";
this.DeafaultAc="";
  }
  save(){
this.masterService.saveBankDetails(this.addedbankDetails).subscribe((data:any)=>{
  if(data=='Success'){
    this.alertService.alert(AlertType.Success,"Record Added Successfully" )
    }
    else if(data=='ERROR')
    {
      this.alertService.alert(AlertType.Error,"Records Addding is Failed");
    }
    this.addedbankDetails="";
})
  }
 

  getCustomerId(data:any){
    this.masterService.getCompanyId(data).subscribe((data:any)=>{
    //console.log(data);
   this.CompanyIds =data;
    })
  }
  changeDeafaultAc($event){
this.DeafaultAc=$event.value;

 }
  onchangeCompanyId($event){
this.CompanyId=$event;
//console.log(this.CompanyId);
  }
  delete(item){
    let index = this.addedbankDetails.indexOf(item);
    this.addedbankDetails.splice(index,1);
  }

}
