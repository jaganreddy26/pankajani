import { Component, OnInit } from '@angular/core';
import {addAgency} from '../../shared/entities/addAgency';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  agency:addAgency = new addAgency();
  CustomerIds:any=[];
  Status:any=[];
  allAgencyDeatils:any=[];
  InputId:any;
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) {
    this.GetCustomers();
    this.GetStatus();
    this.getAllAgencyDetails();
   }

  ngOnInit() {
  }
  openModalEdit(items, template) {
    this.dialog.open(template);
    // this.modalRef = this.modalService.show(template);
    // console.log(items.CompanyId)
    this.InputId = items.AgencyId;
  }

  GetCustomers(){
    let obj ={
      "BusinessId":"0"
    }
    this.masterService.getCustomers(obj).subscribe((data:any)=>{
      // console.log(data);
      this.CustomerIds=data;
    })
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.Status = data;
    })
  }
  save(){
   // console.log(this.agency);
   this.masterService.saveAgencyDetails(this.agency).subscribe((data:any)=>{
    // console.log(data);
     if (data !== 'null') {

      this.alertService.alert(AlertType.Success, data)
      this.getAllAgencyDetails();
    } else {
      this.alertService.alert(AlertType.Error, "Something went wrong");
      this.getAllAgencyDetails();
    }
   })
   this.agency.CustomerId="";
   this.agency.Email="";
   this.agency.AlternateEmail="";
   this.agency.Mobile="";
   this.agency.AlternateMobile="";
   this.agency.AgencyName="";
   this.agency.Status="";
   this.agency.Phone="";
  }

  getAllAgencyDetails(){
    let obj={
      "AgencyId":"0"
    }
    this.masterService.getAgencyDetailsAll(obj).subscribe((data:any)=>{
      console.log(data);
      this.allAgencyDeatils=data;
    })
  }
  onHide() {
    this.getAllAgencyDetails();
    this.dialog.closeAll();

  }
  onchangeCustomerId($event){
    this.agency.CustomerId=$event;
  }
  onchangeStatus($event) {
     if($event=='Active'){
      this.agency.Status=1;
    }
    else{
      this.agency.Status=0;
    }
    console.log(this.agency.Status);
  }
}
