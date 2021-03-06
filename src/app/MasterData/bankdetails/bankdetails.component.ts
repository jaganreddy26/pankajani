import { Component, OnInit } from '@angular/core';
import { BankDetails } from '../../shared/entities/bankDetails';
import { MasterService } from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  CompanyIdSelected:any;
  CustomerIdSelected:any;
  BankName: any;
  BranchName: any;
  Location: any;
  AccountNumber: any;
  IFSCcode: any;
  AccountHolderName: any;
  DeafaultAc: any;
  CustomerIDs: any = [];
  Status: any = [];
  ActiveStatus: any;
  addedbankDetails: any = [];
  AllBankDetails: any = [];
  modalRef: BsModalRef;
  InputId: any;
  value: any;
  businessId:any;
  constructor(private masterService: MasterService, private alertService: AlertService, private modalService: BsModalService, private dialog: MatDialog) {
    let object = { "BusinessId": this.masterService.BusinessId }
    this.getCustomerId(object);
    this.GetStatus();
    this.getBankDetails();
  
  }

  ngOnInit() {

  }
  add() {
    let object = {
      "AcNo": this.AccountNumber,
      "CompanyId":this.masterService.BusinessId,
      "CustomerId": this.CustomerIdSelected,
      "BankName": this.BankName,
      "BranchName": this.BranchName,
      "Location": this.Location,
      "IFSC": this.IFSCcode,
      "AcHolderName": this.AccountHolderName,
      "DefaultAc": this.DeafaultAc,
      "Status": this.ActiveStatus,
    }
    console.log(object);
    this.addedbankDetails.push(object);
    this.AccountNumber = "";
    this.CustomerIdSelected = "";
    this.BankName = "";
    this.BranchName = "";
    this.Location = "";
    this.IFSCcode = "";
    this.AccountHolderName = "";
    this.DeafaultAc = "";
    this.ActiveStatus = "";
    this.CompanyIdSelected="";
    this.value="";
  }
  save() {
    this.masterService.saveBankDetails(this.addedbankDetails).subscribe((data: any) => {
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data);
        this.getBankDetails();
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
        this.getBankDetails();
      }
  
      this.addedbankDetails = "";
    })
  }

  openModalEdit(items, template) {
    this.dialog.open(template);
    // this.modalRef = this.modalService.show(template);
    // console.log(items.CompanyId)
    this.InputId = items.AcNo;
  }

  //To Get All Bank Details
  getBankDetails() {
    let obj = {
      "CompanyId":this.masterService.BusinessId,
      "AcNo": "0"
    }
    this.masterService.getAllBankDetails(obj).subscribe((data: any) => {
      //console.log(data);
      this.AllBankDetails = data;
    })
  }

  getCustomerId(data: any) {
    this.masterService.getCompanyId(data).subscribe((data: any) => {
      //console.log(data);
      this.CustomerIDs = data;
    })
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.Status = data;
    })
  }
  onHide() {
    this.getBankDetails();
    this.dialog.closeAll();

  }

  changeDeafaultAc($event) {
    this.DeafaultAc = $event.value;

  }
  onchangeCustomer($event) {
    this.CustomerIdSelected = $event;
    //console.log(this.CompanyIdSelected);
  }
  onchangeStatus($event) {
      if($event=='Active'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
    console.log(this.ActiveStatus);
  }
  delete(item) {
    let index = this.addedbankDetails.indexOf(item);
    this.addedbankDetails.splice(index, 1);
  }

}
