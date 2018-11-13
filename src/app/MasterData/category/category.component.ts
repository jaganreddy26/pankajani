import { Component, OnInit } from '@angular/core';
import {addCategory} from '../../shared/entities/addCategory';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
category:addCategory=new addCategory();
GoodsTypeIds:any=[];
CustomerIds:any=[];
Status:any=[];
allCategoryDetails:any=[];
InputId:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) { 
    this.GetGoodsType();
    this.GetCustomers();
    this.GetStatus();
    this.GetAllCategoryDetails();
  }

  ngOnInit() {
  }
  openModalEdit(items, template) {
    this.dialog.open(template);
    this.InputId = items.CategoryId;
  }
  save(){
this.masterService.saveCategoryDetails(this.category).subscribe((data:any)=>{
  //console.log(data);
  if (data !== 'null') {

    this.alertService.alert(AlertType.Success, data)
  } else {
    this.alertService.alert(AlertType.Error, "Something went wrong");
  }
})

this.category.GoodsType="";
this.category.CustomerId="";
this.category.CategoryName="";
this.category.Status="";
this.GetAllCategoryDetails();
  }
  GetAllCategoryDetails(){
    let object={
      "CategoryId":0
    }
    this.masterService.getCategoryDetails(object).subscribe((data:any)=>{
    //console.log(data);
    this.allCategoryDetails=data;
    })
  }
GetGoodsType(){
  let obj={
    "CompanyId":localStorage.getItem('businessId')
  }
  this.masterService.getGoodsType(obj).subscribe((data:any)=>{
    console.log(data);
    this.GoodsTypeIds=data;
  })
}
GetCustomers(){
  let obj ={
    "BusinessId":"0"
  }
  this.masterService.getCustomers(obj).subscribe((data:any)=>{
    // console.log(data);
    this.CustomerIds=data;
  })
}
GetStatus() {
  this.masterService.getStatus().subscribe((data: any) => {
    this.Status = data;
  })
}
onHide() {
  this.GetAllCategoryDetails();
  this.dialog.closeAll();

}
onchangeGoodsType($event){
  this.category.GoodsType=$event;
}
onchangeCustomerId($event){
  this.category.CustomerId=$event;
}
onchangeStatus($event) {
  if ($event == 'true') {
    this.category.Status = 1;
  }
  else {
    this.category.Status = 0;
  }
}
}
