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
    if(this.customerId==2){
      this.agencyId=-1;
    }
    else{

      this.agencyId=this.agencyIdSelected;
    }

    let object={
      'BusinessId':this.ubtService.BusinessId,
       'GoodsType':this.selectedGoodstype,
       'CustomerId':this.customerIdSelected,
       "AgencyId":this.agencyId,
       'Quantity':this.Quantity,
       'BasePrice':this.BasePrice,
       'MaxMargin':this.MaxMargin,
       'CategoryId':this.selectedCategoryId
    }

    this.addedUbtDetails.push(object);
    this.goodsTypeSelected ="";
    this.categoryIdSelected ="";
    this.Quantity ="";
    this.BasePrice ="";
    this.MaxMargin ="";
    this.agencyIdSelected="";
    this.selectedCategoryId="";

 

  }
  delete(items){
    let index = this.addedUbtDetails.indexOf(items);
    this.addedUbtDetails.splice(index,1);
  }

}
