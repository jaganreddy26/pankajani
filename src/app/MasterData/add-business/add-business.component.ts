import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  // public show:any=0;
  // Editble:any=0;
 // public buttonName:any = 'Show';
 modalRef: BsModalRef;
BusinessIds:any=[];
status:any=[];
/////
Businessid:any;
Name:any;
ActiveStatus:any;
///
addedBusinesses:any=[]
InputId:any;
value:any;
  constructor(private masterService:MasterService,private modalService: BsModalService,private dialog: MatDialog) {
    
    this.GetBusinessid();
    this.GetStatus();
///To get all ADD Business.
    this.GetBusiness();
   }

  ngOnInit() {
  }
  GetBusinessid(){
    this.masterService.getBusinessIds().subscribe((data:any)=>{
      console.log(data);
      this.BusinessIds=data;
    })
  }
  GetStatus(){
    this.masterService.getStatus().subscribe((data:any)=>{
    //  console.log(data);
      this.status=data;
    })
  }

  //Saveing the Records
  Save(){
    let obj={
      "Id":this.Businessid,
      "Name":this.Name,
      "ActiveStatus":this.ActiveStatus
    }
    console.log(obj);
  this.masterService.SaveBusiness(obj).subscribe((data:any)=>{
    console.log(data);
    
  this.GetBusiness();
  })
  this.Businessid="";
  this.Name="";
  this.ActiveStatus="";
  this.value="";

  }
  openModalEdit(items,template){
    this.dialog.open(template);
    // console.log(items.CompanyId)
   this.InputId=items.Id;
  }
  // Edit(){
  //  console.log(this.show);

  //  if(this.show==0){
  //   this.Editble=1;
  //   this.show=1;
  //   }
  //   else{
  //     this.Editble=0;
  //     this.show=0;
  //   }
  //   console.log(this.Editble);
  //   console.log(this.show);
  // }

  
  

//GetBusiness
GetBusiness(){
  let obj={
    "Id":'0'
  }
  this.masterService.getAllBusinesses(obj).subscribe((data:any)=>{
    console.log(data);
    this.addedBusinesses=data;
  })
  this.GetBusinessid();
}
onHide()
{
 this.GetBusiness();
 this.dialog.closeAll();
 }

  onchangeBusinessId($event){
  //  console.log($event);
  this.Businessid=$event;
  }
  onchangeStatus($event){
    //console.log($event);
    if($event=='Active'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
    console.log(this.ActiveStatus);
  }
 
}
