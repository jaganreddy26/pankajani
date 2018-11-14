import { Component, OnInit } from '@angular/core';
import {UbtService} from '../ubt.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-createubt',
  templateUrl: './createubt.component.html',
  styleUrls: ['./createubt.component.css']
})
export class CreateubtComponent implements OnInit {
  p: number = 1;
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
  constructor(private ubtService:UbtService,private alertService :AlertService) {
    this.getCustomer();
   }

  ngOnInit() {
  }

  getCustomer(){
    let object={
      "BusinessId":localStorage.getItem('businessId'),
    }
    this.ubtService.getCustomer(object).subscribe((data:any)=>{
  // console.log(data);
      this.customer=data;
    })
  }
  getAgencyName(data){
    this.ubtService.getAgencyByCustomerId(data).subscribe((data:any)=>{
 //console.log(data);
     this.agency=data;
    })
  }
  getGoodsTypeList(data){
    this.ubtService.getGoodsTypeByCustomerId(data).subscribe((data:any)=>{
  // console.log(data);
      this.goodsType=data;
    })
  }
  getCategoryNameList(data){
    this.ubtService.getCategoryNameByCustomerId(data).subscribe((data:any)=>{
     // console.log(data);
      this.CategoryNameList=data;
    })
  }

  onchange($event) {
    //console.log($event);
    let object={
      "CustomerId":$event
    }
    this.customerId= $event
    this.getAgencyName(object);
    this.getGoodsTypeList(object);
    this.getCategoryNameList(object);
  }

  onchangeGoodsType($event){
    this.selectedGoodstype=$event
   console.log(this.selectedGoodstype);
  }
  onchangeCategoryName($event){
    this.selectedCategoryId=$event
   console.log(this.selectedCategoryId);
  }

  onchangeAgency($event){
 
      this.agencyId=$event;
    console.log(this.agencyId);
  }

  save(){
//console.log(this.addedUbtDetails);
// var data1=this.addedUbtDetails;



this.ubtService.CreateUbt(this.addedUbtDetails).subscribe((data:any)=>{
console.log(data);
if(data){
  this.alertService.alert(AlertType.Success,"UBT Created Successfuly with id :"+ data)
  }else{
    this.alertService.alert(AlertType.Error,"Something went wrong");
  }
});
this.addedUbtDetails=[];
 }

  add(){

    let object={
      'BusinessId':localStorage.getItem('businessId'),
       'GoodsType':this.selectedGoodstype,
       'CustomerId':this.customerIdSelected,
       "AgencyId":this.agencyId,
       'Quantity':this.Quantity,
       'BasePrice':this.BasePrice,
       'MaxMargin':this.MaxMargin,
       'CategoryId':this.selectedCategoryId
    }
console.log(object);
 this.addedUbtDetails.push(object);
    this.goodsTypeSelected ="";
    this.categoryIdSelected ="";
    this.Quantity ="";
    this.BasePrice ="";
    this.MaxMargin ="";
    this.agencyIdSelected="";
    this.selectedCategoryId="";
    this.customerIdSelected="";
 

  }
  delete(items){
    let index = this.addedUbtDetails.indexOf(items);
    this.addedUbtDetails.splice(index,1);
  }

}
