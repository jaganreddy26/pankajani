import { Component, OnInit } from '@angular/core';
import {MasterService} from '../../MasterData/master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-cancelreason',
  templateUrl: './cancelreason.component.html',
  styleUrls: ['./cancelreason.component.css']
})
export class CancelreasonComponent implements OnInit {
  status:any=[];
  ActiveStatus:any;
  Name:any;
  CancellationReasonDetails:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { 
    this.GetStatus();
    this.GetAllCancellationReasonDetails();
  }

  ngOnInit() {
  }
  GetStatus(){
    this.masterService.getStatus().subscribe((data:any)=>{
    //  console.log(data);
      this.status=data;
    })
  }
  Save(){
let object={
  "CompanyId":localStorage.getItem('businessId'),
  "Name":this.Name,
  "Status":this.ActiveStatus
}
    this.masterService.SaveCancellationReasonDetails(object).subscribe((data:any)=>{
      console.log(data);
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data)
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
      }
      this.GetAllCancellationReasonDetails()
    })
   
    this.Name="";
    this.ActiveStatus="";
  }
GetAllCancellationReasonDetails(){
  let object={
    "CompanyId":localStorage.getItem('businessId'),
    "Id":0
  }
  this.masterService.GetCancellationReasonDetails(object).subscribe((data:any)=>{
    console.log(data);
    this.CancellationReasonDetails=data;
  })
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
