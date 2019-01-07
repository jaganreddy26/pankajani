import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import {addCompany} from '../../shared/entities/addCompany';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  modalRef: BsModalRef;
addcompanyDetail:addCompany=new addCompany();
BusinessIDs:any=[];
status:any=[];
addedCompanyDetails:any=[];
InputId:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private modalService: BsModalService,private dialog: MatDialog) {
   this.getBusinessId();
   this.getStatus();
   this.getAddedCompanyDetails();
   }

  ngOnInit() {
  }
getBusinessId(){
  let object={
    'Id':0
  }
  this.masterService.getBusiness_Ids(object).subscribe((data:any)=>{
   // console.log(data);
    this.BusinessIDs=data;
  })
}
getStatus(){
  this.masterService.getStatus().subscribe((data:any)=>{
   // console.log(data);
    this.status=data;
  })
}
Save(){
 // console.log(this.addcompanyDetail);
  this.masterService.saveComapnyDetails(this.addcompanyDetail).subscribe((data:any)=>{
   // console.log(data);
    if(data !== 'null'){

      this.alertService.alert(AlertType.Success, data)
      this.getAddedCompanyDetails();
    }else{
      this.alertService.alert(AlertType.Error,"Something went wrong");
      this.getAddedCompanyDetails();
    }
  })
  this.addcompanyDetail.BusinessId="";
  this.addcompanyDetail.CompanyName="";
  this.addcompanyDetail.Email="";
  this.addcompanyDetail.AlternateEmail="";
  this.addcompanyDetail.Mobile="";
  this.addcompanyDetail.AlternateMobile="";
  this.addcompanyDetail.Address1="";
  this.addcompanyDetail.Address2="";
  this.addcompanyDetail.Address3="";
  this.addcompanyDetail.CIN="";
  this.addcompanyDetail.GSTIN="";
  this.addcompanyDetail.PAN="";
  this.addcompanyDetail.TAN_NO="";
  this.addcompanyDetail.Status="";
}
  //GetCompanyDetails
  getAddedCompanyDetails(){
    let obj={
      "CompanyId":"0"
    }
    this.masterService.getcompanyDetails(obj).subscribe((data:any)=>{
     // console.log(data);
     this.addedCompanyDetails=data;
    })
  }



  openModalEdit(items,template){
    this.dialog.open(template);
    // console.log(items.CompanyId)
    this.InputId=items.CompanyId;
  }

  onHide()
   {
    this.getAddedCompanyDetails();
    this.dialog.closeAll();
    }













onchangeBusinessID($event){
  this.addcompanyDetail.BusinessId=$event;
}
onchangeStatus($event){

  if($event==true)
    this.addcompanyDetail.Status=1;

  else
    this.addcompanyDetail.Status=0;

  console.log(this.addcompanyDetail.Status)
}

}
