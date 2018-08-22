import { Component, OnInit,TemplateRef } from '@angular/core';
import { UbtService } from '../ubt.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-amendubt',
  templateUrl: './amendubt.component.html',
  styleUrls: ['./amendubt.component.css']
})
export class AmendubtComponent implements OnInit {
  status:any=[];
  StatusName:any;
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
  modalRef: BsModalRef;
  moduleGoodsType:any;
  getGoodsTypeList1:any=[];
  constructor(private ubtService: UbtService,private modalService: BsModalService) {

    this.getCustomer();
  }
  openModal(items,template: TemplateRef<any>) {
this.moduleGoodsType=items.CategoryId,


this.ubtService.getGoodsType(this.moduleGoodsType).subscribe((data: any) => {
// console.log(data)
this.getGoodsTypeList1=data;
console.log(this.getGoodsTypeList1);
})
    this.modalRef = this.modalService.show(template);
    
  }



  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.ubtService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
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

  edit(item) {
    console.log(item)
    this.editDetails = true;
    this.udtData = [];

    this.ubtService.GetIndividualUbtDetails(item).subscribe((data: any) => {
      // this.udtData = data;
      data.forEach(element => {
        this.udtData.push({ 'GoodsType': element.GoodsType, 'CategoryId': element.CategoryId,'CategoryName': element.CategoryName, 'Quantity': element.Quantity, 'BasePrice':element.BasePrice, 'MaxMargin':element.MaxMargin});
        this.agencyIdSelected = element.AgencyId;
        this.customerIdSelected = element.CustomerName;
        this.confirmBiddingStatus = element.ConfirmBidding;
      }); 
    })
  }
  onchange($event) {
    this.Id = $event;
    this.getAgencyName($event);
    this.getGoodsTypeList($event);
    this.getCategoryNameList($event);
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

  onchangeGoodsType($event) {

  }
  getGoodsTypeList(id) {
    this.ubtService.getGoodsType(id).subscribe((data: any) => {
      // console.log(data);
      this.goodsType = data;
    })
  }
  getCategoryNameList(id) {
    this.ubtService.getCategoryName(id).subscribe((data: any) => {
      // console.log(data);
      this.CategoryNameList = data;
    })
  }
  getAgencyName(id){
    this.ubtService.getAgency(id).subscribe((data:any)=>{
 //console.log(data);
     this.agency=data;
    })
  }
  onchangeCategoryName($event){

  }
  add(){
    let object={
      'GoodsType':this.goodsTypeSelected,
      'CategoryName':this.categoryIdSelected,
      'Quantity':this.Quantity,
      'BasePrice':this.BasePrice,
      'MaxMargin':this.MaxMargin
   }

   this.udtData.push(object);
   this.goodsTypeSelected ="";
   this.categoryIdSelected ="";
   this.Quantity ="";
   this.BasePrice ="";
   this.MaxMargin ="";

  }
  delete(items){
    let index = this.udtData.indexOf(items);
    this.udtData.splice(index,1);
  }
  updateUbt(){

  }
}
