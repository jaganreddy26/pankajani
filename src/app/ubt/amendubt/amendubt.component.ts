import { Component, OnInit,TemplateRef } from '@angular/core';
import { UbtService } from '../ubt.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
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
  addedNewCategoryToUbtId:any=[];
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

  selectedCategoryId
  individualUbtDetailsInput:any;
  goodsTypenew:any=[];
  CategoryNameListnew:any=[];
  agencynew:any=[];
  ubtidInput:any;
  customerIDStatic:any;
  AgencyIdStatic:any;
  //below are variables are to send send the input details in object formate(to get "getIndividualUbtCategory")
  ubtidinput:any;
  goodsTypeinput:any;
  categoryNameinput:any;
  categoryIdinput:any;
  ///

  individualUbtCategory:any= {};
  ///upto here 
  constructor(private ubtService: UbtService,private modalService: BsModalService
  ,private alertService :AlertService) {

    this.getCustomer();
  }
  openModal(items,template: TemplateRef<any>) {

this.ubtidinput=this.ubtidInput,
this.goodsTypeinput=items.GoodsType,
this.categoryNameinput=items.CategoryName,
this.categoryIdinput=items.CategoryId,
this.getedit();
    this.modalRef = this.modalService.show(template);
    
  }
  getedit(){
  let object={
    "UbtId":this.ubtidinput,
    "CustomerId":this.customerId,
    "GoodsType":this.goodsTypeinput,
    "CategoryId":this.categoryIdinput
  }
  console.log(object);
  this.ubtService.getIndividualUbtCategory(object).subscribe((data:any)=>{
    console.log(data);
    this.individualUbtCategory=data[0];
  })
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
    this.ubtidInput=item.UbtId
    // console.log(item)
    this.individualUbtDetailsInput=item;
    console.log(this.individualUbtDetailsInput);
    this.editDetails = true;
    this.udtData = [];
    
    this.ubtService.GetIndividualUbtDetails(item).subscribe((data: any) => {

      data.forEach(element => {
        this.udtData.push({'CustomerId':element.CustomerId,'AgencyId':element.AgencyId, 'GoodsType': element.GoodsType, 'CategoryId': element.CategoryId,'CategoryName': element.CategoryName, 'Quantity': element.Quantity, 'BasePrice':element.BasePrice, 'MaxMargin':element.MaxMargin});
        this.agencyIdSelected = element.AgencyId;
        this.customerIdSelected = element.CustomerName;
        this.confirmBiddingStatus = element.ConfirmBidding;
       this.customerIDStatic=element.CustomerId;
       this.AgencyIdStatic=element.AgencyId;
       console.log(this.customerIDStatic);
      
       
      }); 
    
      this.getGoodsTypeListForNew(this.customerIDStatic);
    this.getCategoryNameListForNew(this.customerIDStatic);
    })
    
    
  }
  getGoodsTypeListForNew(id) {
    this.ubtService.getGoodsType(this.customerIDStatic).subscribe((data: any) => {
     console.log(data);
      this.goodsTypenew = data;
    })
  }
  getCategoryNameListForNew(id) {
    this.ubtService.getCategoryName(this.customerIDStatic).subscribe((data: any) => {
     console.log(data);
      this.CategoryNameListnew = data;
    })
  }
   onchange($event) {
    this.Id = $event;
    this.getAgencyName($event);
    this.getGoodsTypeList($event);
    this.getCategoryNameList($event);
 }
 getGoodsTypeList(id) {
  this.ubtService.getGoodsType(id).subscribe((data: any) => {
   console.log(data);
    this.goodsType = data;
  })
}
getCategoryNameList(id) {
  this.ubtService.getCategoryName(id).subscribe((data: any) => {
   console.log(data);
    this.CategoryNameList = data;
  })
}
getAgencyName(id){
  this.ubtService.getAgency(id).subscribe((data:any)=>{
console.log(data);
   this.agency=data;
  })
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

 
  
  onchangeCategoryName($event){
    this.selectedCategoryId=$event
    console.log(this.selectedCategoryId);
  }
  onchangeGoodsType($event){

  }
  //--(Adding new category to the existing UBT_ID request data)--//
  add(){
    let object={
      'UBTId':this.ubtidInput,
      'BusinessId':this.ubtService.BusinessId,
      'AgencyId':this.AgencyIdStatic,
      'CustomerId':this.customerIDStatic,
      'GoodsType':this.goodsTypeSelected,
      'CategoryId':this.selectedCategoryId,
      'Quantity':this.Quantity,
      'BasePrice':this.BasePrice,
      'MaxMargin':this.MaxMargin
   }
//console.log(object);
   this.addedNewCategoryToUbtId.push(object);
   this.goodsTypeSelected ="";
   this.selectedCategoryId ="";
   this.Quantity ="";
   this.BasePrice ="";
   this.MaxMargin ="";

  }
   //--(ENDED)--//

   saveRecords(){
    this.ubtService.addNewCategoryToUbtId(this.addedNewCategoryToUbtId).subscribe((data:any)=>{
      console.log(data);
      if(data=='Success'){
        this.alertService.alert(AlertType.Success,"New GoodsType is Added for this UbtID :"+ this.ubtidInput)
        }else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
    })
    this.addedNewCategoryToUbtId=[];
  }
  delete(items){
    let index = this.addedNewCategoryToUbtId.indexOf(items);
    this.addedNewCategoryToUbtId.splice(index,1);
  }
  updateRecord(){
//console.log("hi ubt" );
//console.log(this.individualUbtCategory);
let object={
  "UbtId":this.ubtidinput,
  "CustomerId":this.customerId,
  "GoodsType":this.goodsTypeinput,
  "CategoryId":this.categoryIdinput,
  "Quantity":this.individualUbtCategory.Quantity,
  "BasePrice":this.individualUbtCategory.BasePrice,
  "MaxMargin":this.individualUbtCategory.MaxMargin

}
console.log(object);
this.ubtService.updateIndividualUbtCategory(object).subscribe((data:any)=>{

  console.log(data);
  if(data=='Success'){
    this.alertService.alert(AlertType.Success,"Successfuly Upadted The Record For This "+ this.goodsTypeinput+"and categoryId is"+this.categoryIdinput)
    }else{
      this.alertService.alert(AlertType.Error,"Something went wrong");
    }
})
//Here we will the method to get the upadted details after updating the record details
this.edit(this.individualUbtDetailsInput);

this.modalRef.hide()
  }
 
}