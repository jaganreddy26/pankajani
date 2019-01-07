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
  CompanyIdSelected: any;
  BankName: any;
  BranchName: any;
  Location: any;
  AccountNumber: any;
  IFSCcode: any;
  AccountHolderName: any;
  DeafaultAc: any;
  CompanyIds: any = [];
  Status: any = [];
  ActiveStatus: any;
  addedbankDetails: any = [];
  AllBankDetails: any = [];
  modalRef: BsModalRef;
  InputId: any;
  value: any;
  businessId:any;
  constructor(private masterService: MasterService, private alertService: AlertService, private modalService: BsModalService, private dialog: MatDialog) {
    let object = { "BusinessId": 0 }
    this.getCustomerId(object);
    this.GetStatus();
    this.getBankDetails();
  
  }

  ngOnInit() {

  }
  add() {
    let object = {
      "AcNo": this.AccountNumber,
      "CompanyId": this.CompanyIdSelected,
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
    this.CompanyIdSelected = "";
    this.BankName = "";
    this.BranchName = "";
    this.Location = "";
    this.IFSCcode = "";
    this.AccountHolderName = "";
    this.DeafaultAc = "";
    this.ActiveStatus = "";
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
      this.CompanyIds = data;
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
  onchangeCompanyId($event) {
    this.CompanyIdSelected = $event;
    //console.log(this.CompanyIdSelected);
  }
  onchangeStatus($event) {
    //console.log($event);
    if ($event == 'true') {
      this.ActiveStatus = 1;
    }
    else {
      this.ActiveStatus = 0;
    }
    //  console.log(this.ActiveStatus);
  }
  delete(item) {
    let index = this.addedbankDetails.indexOf(item);
    this.addedbankDetails.splice(index, 1);
  }

}
