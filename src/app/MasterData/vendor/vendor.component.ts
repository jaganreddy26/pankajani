import { Component, OnInit } from '@angular/core';
import {Vendor} from '../../shared/entities/Vendor';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendor:Vendor = new Vendor();
  BusinessAreaIds:any=[];
  Status:any=[];
  allVendorDeatils:any=[];
  InputId:any;
  constructor(private masterService:MasterService,private alertService :AlertService,
              private dialog: MatDialog) {
                this.vendor.CompanyId = localStorage.getItem('businessId')
                this.GetBusinessAreaId();
                this.GetStatus();
                this.GetAllVendorDetails();
       }

  ngOnInit() {
  }
  GetBusinessAreaId(){
    let obj={
      "CompanyId":localStorage.getItem('businessId'),
       "Id":0
    }
    this.masterService.getAreaBusinessDetails(obj).subscribe((data:any)=>{
      console.log(data);
      this.BusinessAreaIds=data;
    })
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.Status = data;
    })
  }
  save(){
   //console.log(this.vendor);
    this.masterService.saveVendorDetails(this.vendor).subscribe((data:any)=>{
      console.log(data);
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data)
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
      }
    })
    this.GetAllVendorDetails();
    this.vendor.BusinessAreaId="";
    this.vendor.VendorName="";
    this.vendor.Email="";
    this.vendor.AlternateEmail="";
    this.vendor.Phone="";
    this.vendor.Mobile="";
    this.vendor.AlternateMobile="";
    this.vendor.CIN="";
    this.vendor.GSTIN="";
    this.vendor.PAN="";
    this.vendor.Address1="";
    this.vendor.Address2="";
    this.vendor.Address3="";
    
    this.vendor.Status="";
    this.vendor.TAN_NO="";
  }

  //Get VENDOR DETAILS
  GetAllVendorDetails(){
    let object={
      "CompanyId":localStorage.getItem('businessId'),
      "VendorId":"0"
    }
    this.masterService.getVendorDetails(object).subscribe((data:any)=>{
      console.log(data);
      this.allVendorDeatils=data;
    })
  }
  /////////////////// Edit Perticular Record data //////////////////////////////
  openModalEdit(items,template){
    this.dialog.open(template);
    let object={
      "CompanyId":localStorage.getItem('businessId'),
      "VendorId":items.VendorId
      }
      this.InputId =object
  }
  ///After update to get Updated Data
  onHide() {
    this.GetAllVendorDetails();
    this.dialog.closeAll();

  }
  onchangeBusinessAreaId($event){
  this.vendor.BusinessAreaId=$event;
  }
  onchangeStatus($event) {

    if ($event == 'true') {
      this.vendor.Status = 1;
    }
    else {
      this.vendor.Status = 0;
    }

  }
}
