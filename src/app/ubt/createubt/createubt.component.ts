import { Component, OnInit } from '@angular/core';
import {UbtService} from '../ubt.service'
@Component({
  selector: 'app-createubt',
  templateUrl: './createubt.component.html',
  styleUrls: ['./createubt.component.css']
})
export class CreateubtComponent implements OnInit {
  customer:any=[];
  agency:any=[];
  goodsType:any=[];
  CategoryNameList:any=[];
  value:any;
  customerId:any;
    Id:any;
    agencyId:any;

  // objects:any=[];
addedUbtDetails:any=[];
  selectedGoodstype:any;
  selectedCategoryId:any;
  Quantity:any;
  BasePrice:any;
  MaxMargin:any;
  customerIdSelected:any;
  agencyIdSelected:any;
  goodsTypeSelected:any;
  categoryIdSelected:any;
  concatenateCategory:any;
  constructor(private ubtService:UbtService) {
    this.getCustomer();
   }

  ngOnInit() {
  }

  getCustomer(){
    this.ubtService.getCustomerName().subscribe((data:any)=>{
  // console.log(data);
      this.customer=data;
    })
  }
  getAgencyName(id){
    this.ubtService.getAgency(id).subscribe((data:any)=>{
 //console.log(data);
     this.agency=data;
    })
  }
  getGoodsTypeList(id){
    this.ubtService.getGoodsType(id).subscribe((data:any)=>{
  // console.log(data);
      this.goodsType=data;
    })
  }
  getCategoryNameList(id){
    this.ubtService.getCategoryName(id).subscribe((data:any)=>{
     // console.log(data);
      this.CategoryNameList=data;
    })
  }

  onchange($event) {
    this.customerId= $event
    this.getAgencyName($event);
    this.getGoodsTypeList($event);
    this.getCategoryNameList($event);
  }

  onchangeGoodsType($event){
    this.selectedGoodstype=$event
    // console.log(this.selectedGoodstype);
  }
  onchangeCategoryName($event){
    this.selectedCategoryId=$event
   // console.log(this.selectedCategoryId);
  }

  onchangeAgency($event){
 
      this.Id=$event;
   // console.log(this.Id);
  }

  createUbt(){

    if(this.customerId==2){
      this.agencyId=-1;
    }
    else{
      this.agencyId=this.agencyIdSelected;
    }
    for (let ubt of this.addedUbtDetails) {
      console.log(ubt)
        this.concatenateCategory = ubt.GoodsType+':'+ubt.CategoryName+':'+ubt.Quantity+':'+ubt.BasePrice+':'+ubt.MaxMargin;
    }
    var data ={UbtId:null,BusinessId:this.ubtService.BusinessId,CategoryId:this.concatenateCategory,CustomerId:this.customerIdSelected,AgencyId:this.agencyIdSelected};
// let newobject={
//   BusinessId:this.ubtService.BusinessId,
//   CustomerId:this.customerId,
//   CategoryId:this.selectedGoodstype+':'+this.selectedCategoryId+':'+this.Quantity+':'+this.BasePrice+':'+this.MaxMargin,
//   agency:this.agencyId,
  
// }
console.log(data);
// this.ubtService.postCreateUbt(data).subscribe((data:any)=>{
//   console.log(data);
  
// })
 }

  add(){

    let object={
       'Goodstype':this.goodsTypeSelected,
       'CategoryName':this.categoryIdSelected,
       'Quality':this.Quantity,
       'BasePrice':this.BasePrice,
       'maxPrice':this.MaxMargin
    }

    this.addedUbtDetails.push(object);
    this.goodsTypeSelected ="";
    this.categoryIdSelected ="";
    this.Quantity ="";
    this.BasePrice ="";
    this.MaxMargin ="";

     console.log(this.addedUbtDetails);

  }
  delete(items){
    let index = this.addedUbtDetails.indexOf(items);
    this.addedUbtDetails.splice(index,1);
  }

}
