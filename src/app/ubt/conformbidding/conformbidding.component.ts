import { Component, OnInit } from '@angular/core';
import { UbtService } from '../ubt.service';

import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
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
  
////==========base64formatedata Varibles=========////
file:any;
filedata:any;
base64data:any
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
  changeListener($event) : void {
    this.readThis($event.target);
    console.log($event);
  }
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.filedata = myReader.result;
     this.base64data=this.filedata
     // console.log(this.base64data);
    }
    myReader.readAsDataURL(file);
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
   // this.udtData = [];

    // this.ubtService.GetIndividualUbtDetails(item).subscribe((data: any) => {
    //   // this.udtData = data;
    //   data.forEach(element => {
    //     this.udtData.push({ "UBTId":this.InputUbtId,
    //                         'GoodsType': element.GoodsType,
    //                         'CategoryId': element.CategoryId,
    //                         'CategoryName': element.CategoryName,
    //                         'Quantity': element.Quantity, 
    //                         'BasePrice':element.BasePrice,
    //                         'MaxMargin':element.MaxMargin,
    //                         'BiddingQty':element.BiddingQty,
    //                         'BiddingPrice':element.BiddingPrice
    //                       });
    //     this.agencyIdSelected = element.AgencyId;
    //     this.customerIdSelected = element.CustomerName;
    //     this.confirmBiddingStatus = element.ConfirmBidding;
    //   }); 
    // })
    this.ubtService.GetIndividualUbtDetails(obj).subscribe((data:any)=>{
      console.log(data);
     this.udtData=data;
    })
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
    //console.log(this.base64data);
    //console.log(this.udtData);
    let object={
      "FilePath":'File/rasmi.pdf',
      "ConfirmBiddingUbt":this.udtData
    }
   // console.log(object);
   this.ubtService.confirmBidding(object).subscribe((data:any)=>{
     console.log(data);
     if(data=='Success'){
      this.alertService.alert(AlertType.Success,"Confirm Bidding Successfuly For This "+this.InputUbtId);
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
      }
   })
  }

  
 
}
