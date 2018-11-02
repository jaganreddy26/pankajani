import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  public show:any=0;
  Editble:any=0;
 // public buttonName:any = 'Show';
BusinessIds:any=[];
status:any=[];
/////
Businessid:any;
Name:any;
ActiveStatus:any;
///
addedBusinesses:any=[]

  constructor(private masterService:MasterService) {
    console.log(this.show);
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
    //console.log(obj);
  this.masterService.SaveBusiness(obj).subscribe((data:any)=>{
    console.log(data);
    
  this.GetBusiness();
  })
  this.Businessid="";
  this.Name="";
  this.ActiveStatus="";

  }

  Edit(){
   console.log(this.show);

   if(this.show==0){
    this.Editble=1;
    this.show=1;
    }
    else{
      this.Editble=0;
      this.show=0;
    }
    console.log(this.Editble);
    console.log(this.show);
  }

  
  

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
