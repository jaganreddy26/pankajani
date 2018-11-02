import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
BusinessIds:any=[];
status:any=[];
/////
Businessid:any;
Name:any;
ActiveStatus:any;

  constructor(private masterService:MasterService) {
    this.GetBusinessid();
    this.GetStatus();
///To get all ADD Business.
    this.GetBusiness();
   }

  ngOnInit() {
  }
  GetBusinessid(){
    this.masterService.getBusinessIds().subscribe((data:any)=>{
     // console.log(data);
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
    //console.log(obj);
  this.masterService.SaveBusiness(obj).subscribe((data:any)=>{
    console.log(data);
  })
  this.Businessid="";
  this.Name="";
  this.ActiveStatus="";
  }

//GetBusiness
GetBusiness(){
  let obj={
    "Id":'0'
  }
  this.masterService.getAllBusinesses(obj).subscribe((data:any)=>{
    console.log(data);
  })
}

  onchangeBusinessId($event){
  //  console.log($event);
  this.Businessid=$event;
  }
  onchangeStatus($event){
    //console.log($event);
    if($event=='true'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
  //  console.log(this.ActiveStatus);
  }
 
}
