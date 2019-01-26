import { Component, OnInit } from '@angular/core';
import { UbtService } from '../ubt.service';

import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { element } from 'protractor';
@Component({
  selector: 'app-conformbidding',
  templateUrl: './conformbidding.component.html',
  styleUrls: ['./conformbidding.component.css']
})
export class ConformbiddingComponent implements OnInit {

  customer: any = []
  FromDate: any = new Date();
  ToDate: any = new Date();
  Id: any;
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  amendUbtIds: any = [];
  value: any;
  editDetails: boolean = false;
  udtData: any = [];
  ids: any = [];
  goodsTypeSelected: any;
  goodsType: any = [];
  CategoryNameList: any = [];
  agency:any=[];
  agencyIdSelected:any;
  customerIdSelected:any;
  confirmBiddingStatus: string;
  categoryIdSelected:any;
  Quantity:any;
  BasePrice:any;
  MaxMargin:any;
  status:any=[];
  StatusName:any;

  InputUbtId:any;
  FilePath:any;
  ConfirmBiddingType:any;
////==========base64formatedata Varibles=========////
base64textString:any;
FileName:any;
FileType:any;
  constructor(private ubtService: UbtService,private alertService :AlertService) {
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.ubtService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }


  handleFileSelect(evt){
    //console.log(evt);
    var File=evt.target.value;
   // console.log(File);
     let subStringData=File.substr(12);
     console.log(subStringData);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType =subStringData.split('.')[1];
    console.log(FileName);
    console.log(FileType);
   this.FileName=FileName;
   this.FileType=FileType;
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
          this.base64textString= btoa(binaryString);
          console.log(this.base64textString);
  }


  getCustomer() {
    this.ubtService.getCustomerName().subscribe((data: any) => {
      console.log(data);
      this.customer = data;
    })
  }
  search() {
    this.businessId = this.ubtService.BusinessId;
    this.customerId = this.Id;
    //console.log(this.customerId);
    if (this.fromDateChanged == false) {
      this.FromDate.toLocaleDateString();
      var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
      this.FromDate = fromdate;
      this.fromDateChanged = true
    }
    if (this.toDateChanged == false) {
      this.ToDate.toLocaleDateString();
      var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
      this.ToDate = todate;
      this.toDateChanged = true;
    }
    let object = {
      'BusinessId': this.businessId,
      'CustomerId': this.customerId,
      'FromDate': this.FromDate,
      'ToDate': this.ToDate,
      'Status':this.StatusName
    }
    this.ubtService.getViewUbtDetails(object).subscribe((data: any) => {
      this.ids = data;
    })
  }

  save(item) {
   // console.log(item)
    //console.log(item.UbtId);
    let obj={
      "UBTId":item.UbtId
    }
    this.InputUbtId=item.UbtId;
    this.editDetails = true;
    this.ubtService.GetIndividualUbtDetails(obj).subscribe((data:any)=>{
      console.log(data);
     this.udtData=data;
    this.FilePath=data[0].FilePath;
    this.ConfirmBiddingType=data[0].ConfirmBidding;
    console.log(this.ConfirmBiddingType);
    })
    // this.StatusName="";
    // this.value="";
  }
  onchange($event) {
    this.Id = $event;
    // this.getAgencyName($event);
    // this.getGoodsTypeList($event);
    // this.getCategoryNameList($event);
  }
  fromDateChange() {
    this.fromDateChanged = true;
    this.FromDate.toLocaleDateString();
    var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
    this.FromDate = fromdate;
  }
  toDateChange() {
    this.toDateChanged = true;
    this.ToDate.toLocaleDateString();
    var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
    this.ToDate = todate;
  }

  send(){

   // console.log(this.FileName);
    //console.log(this.FileType);
    let array:any=[];
    this.udtData.forEach(element=>{
      array.push({'UBTId':this.InputUbtId,
                   'CustomerId':element.CustomerId,
                   'GoodsType': element.GoodsType,
                   'CategoryId': element.CategoryId,
                   'BiddingQty':element.BiddingQty,
                   'BiddingPrice':element.BiddingPrice
                  })
    })
  
    let object={
      "FilePath":this.FilePath,
      "EncryptedFile":this.base64textString,
      "FileExtn":this.FileType,
      "UploadedFileName":this.FileName,
      "ConfirmBiddingUbt":array
    }
  console.log(object);
  
   this.ubtService.confirmBidding(object).subscribe((data:any)=>{
     console.log(data);
     if(data=='Success'){
      this.alertService.alert(AlertType.Success,"Confirm Bidding Successfuly For This "+this.InputUbtId);
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
      }

      let obj={
        "UBTId":this.InputUbtId
      }
    
      this.ubtService.GetIndividualUbtDetails(obj).subscribe((data:any)=>{
        console.log(data);
       this.udtData=data;
      this.FilePath=data[0].FilePath;
      this.ConfirmBiddingType=data[0].ConfirmBidding;
      console.log(this.ConfirmBiddingType)
      })
   })

  }
  onchangeStatus($event){
    this.StatusName=$event;
  }
  
 
}
