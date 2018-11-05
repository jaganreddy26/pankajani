import { Component, OnInit,TemplateRef } from '@angular/core';
import { Plants } from '../../shared/entities/plants';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert'
@Component({
  selector: 'app-plantdetails',
  templateUrl: './plantdetails.component.html',
  styleUrls: ['./plantdetails.component.css']
})
export class PlantdetailsComponent implements OnInit {
  BusinessIds:any=[];
plant:Plants = new Plants();
  constructor(private masterService:MasterService,private alertService :AlertService) { 
  this.GetbusinnessId();
  }

  ngOnInit() {
  }
  save(){
 

    this.masterService.savePlantDetails(this.plant).subscribe((data:any)=>{
      console.log(data);
      if(data=='Success'){
        this.alertService.alert(AlertType.Success,"Record Added Successfully" )
        }
        else if(data=='ERROR')
        {
          this.alertService.alert(AlertType.Error,"Records Addding is Failed");
        }
    })
   
    this.plant.BusinessId="";
    this.plant.PlantName="";
    this.plant.Email="";
    this.plant.AlternativeEmail="";
    this.plant.Mobile="";
    this.plant.AlternativeMobile="";
    this.plant.Address1="";
    this.plant.Address2="";
    this.plant.Address3="";
    this.plant.CIN="";
    this.plant.GSTIN="";
    this.plant.PAN="";
    this.plant.TAN_NO="";
  }
  GetbusinnessId(){
    this.masterService.getBusinessId().subscribe((data:any)=>{
      console.log(data);
      this.BusinessIds=data;
    })
  }
  onchangeBusinessId($event){
  this.plant.BusinessId=$event
  console.log(this.plant.BusinessId);
  }
}
