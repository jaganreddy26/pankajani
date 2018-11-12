import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-areaof-business',
  templateUrl: './areaof-business.component.html',
  styleUrls: ['./areaof-business.component.css']
})
export class AreaofBusinessComponent implements OnInit {
  status:any=[];
  Name:any;
  ActiveStatus:any;
  BusinessAreaDetailas:any=[];
  InputId:any;
  constructor(private masterService:MasterService,
    private alertService :AlertService,private dialog: MatDialog) {
    this.GetStatus();
    this.GetAllAreaBusinessDetails();
   }

  ngOnInit() {
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.status = data;
    })
  }
  Save(){
  // localStorage.getItem('businessId')
 let obj= {
    "CompanyId":localStorage.getItem('businessId'),
    "Name":this.Name,
    "Status":this.ActiveStatus,
    }
    console.log(obj);
this.masterService.saveAreaOfBusinessDetails(obj).subscribe((data:any)=>{
  console.log(data);

  if(data !== 'null'){

    this.alertService.alert(AlertType.Success, data)
  }else{
    this.alertService.alert(AlertType.Error,"Something went wrong");
  }
  this.GetAllAreaBusinessDetails();
})

this.Name="";
this.ActiveStatus="";
  }
  GetAllAreaBusinessDetails(){
    let obj={
      "CompanyId":localStorage.getItem('businessId'),
       "Id":0
    }
    this.masterService.getAreaBusinessDetails(obj).subscribe((data:any)=>{
      // console.log(data);
      this.BusinessAreaDetailas=data;
    })
  }
  openModalEdit(items,template){
let object={
  "CompanyId":localStorage.getItem('businessId'),
"Id":items.Id
}
this.dialog.open(template);
this.InputId = object;
  }

  onHide() {
   
    this.dialog.closeAll();
    this.GetAllAreaBusinessDetails();

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
