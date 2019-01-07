import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import { MatDialog } from "@angular/material";
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-goodstype',
  templateUrl: './goodstype.component.html',
  styleUrls: ['./goodstype.component.css']
})
export class GoodstypeComponent implements OnInit {
  status:any=[];
  Name:any;
  ActiveStatus:any;
  GoodsTypeDetails:any=[];
  InputId:any;
  value:any;
  constructor(private masterService:MasterService,private dialog: MatDialog,private alertService :AlertService) {
    this.GetStatus();
    this.GetAllGoodsTypeDetils();
   }

  ngOnInit() {
  }
  Save(){
    // localStorage.getItem('businessId')
   let obj= {
      "CompanyId":this.masterService.BusinessId,
      "Name":this.Name,
      "Status":this.ActiveStatus,
      }
     // console.log(obj);
     this.masterService.saveGoodsTypeDetails(obj).subscribe((data:any)=>{
       console.log(data);
       if(data !== 'null'){

        this.alertService.alert(AlertType.Success, data);
        this.GetAllGoodsTypeDetils();
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
        this.GetAllGoodsTypeDetils();
      }
    
     })
      this.Name="";
      this.ActiveStatus="";
    }
    GetAllGoodsTypeDetils(){
      let object={
        "CompanyId":this.masterService.BusinessId,
        "Id":'0'
      }
      this.masterService.getGoodsTypeDetails(object).subscribe((data:any)=>{
        console.log(data);
        this.GoodsTypeDetails=data;
      })
    }
    onHide() {
      this.GetAllGoodsTypeDetils();
      this.dialog.closeAll();
  
    }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.status = data;
    })
  }
  openModalEdit(items,template){
    this.dialog.open(template);
    let object={
      "CompanyId":items.CompanyId,
      "Id":items.Id
    }
    this.InputId =object;
  }
  onchangeStatus($event){
    //console.log($event);
    if($event=='true'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
  }
}
