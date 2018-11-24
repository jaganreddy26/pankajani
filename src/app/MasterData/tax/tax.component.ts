import { Component, OnInit } from '@angular/core';
import {Tax} from '../../shared/entities/tax';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  tax:Tax = new Tax();
  goodsID:any=[];
  Status:any=[];
  allGoodsDetails:any=[];
  InputId:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) { 
    this.tax.CompanyId=localStorage.getItem('businessId');
    this.GetGoodsTypeId();
    this.GetStatus();
    this.getGoodsDetails();
  }

  ngOnInit() {
  }
GetGoodsTypeId(){
  let obj={
    "CompanyId":localStorage.getItem('businessId')
  }
  this.masterService.getGoodsTypeID(obj).subscribe((data:any)=>{
   // console.log(data);
    this.goodsID=data;
  })
}
GetStatus() {
  this.masterService.getStatus().subscribe((data: any) => {
    this.Status = data;
  })
}

save(){
//console.log(this.tax);
this.masterService.saveGoodsDetails(this.tax).subscribe((data:any)=>{
  // console.log(data);
  if (data !== 'null') {

    this.alertService.alert(AlertType.Success, data)
  } else {
    this.alertService.alert(AlertType.Error, "Something went wrong");
  }
})
this.tax.GoodsId="";
this.tax.CGST="";
this.tax.IGST="";
this.tax.SGST="";
this.tax.Status="";
this.tax.TCS="";
this.tax.TDS="";
this.getGoodsDetails();
}
//get all Added GoodsDetails
getGoodsDetails(){
  let obj={
    "CompanyId":localStorage.getItem('businessId'),
    "GoodsId":'0'
  }
  this.masterService.getaddedGoodsDetails(obj).subscribe((data:any)=>{
    //console.log(data);
    this.allGoodsDetails=data;
  })
}
openModalEdit(items,template){
  this.dialog.open(template);

  let object={
    "CompanyId":localStorage.getItem('businessId'),
    "GoodsId":items.GoodsId
  }
  this.InputId =object;
}
onHide() {
  this.getGoodsDetails();
  this.dialog.closeAll();

}
onchangeGoodsType($event){
  this.tax.GoodsId=$event;
}
onchangeStatus($event) {
  //console.log($event);
  if ($event == 'true') {
    this.tax.Status = 1;
  }
  else {
    this.tax.Status = 0;
  }
  //  console.log(this.ActiveStatus);
}
}
