import { Component, OnInit,TemplateRef } from '@angular/core';
import { Plants } from '../../shared/entities/plants';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-plantdetails',
  templateUrl: './plantdetails.component.html',
  styleUrls: ['./plantdetails.component.css']
})
export class PlantdetailsComponent implements OnInit {
  BusinessIds:any=[];
plant:Plants = new Plants();
Status:any=[];
allplantDeatils:any=[];
InputId:any;
value:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) { 
  this.GetbusinnessId();
  this.GetStatus();
  this.GetALLPlantDetails();
  }

  ngOnInit() {
  }
  save(){
 

    this.masterService.savePlantDetails(this.plant).subscribe((data:any)=>{
      console.log(data);
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data)
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
      }
    })

    this.plant.CompanyId="";
    this.plant.PlantName="";
    this.plant.Email="";
    this.plant.AlternateEmail="";
    this.plant.Mobile="";
    this.plant.AlternateMobile="";
    this.plant.Address1="";
    this.plant.Address2="";
    this.plant.Address3="";
    this.plant.CIN="";
    this.plant.GSTIN="";
    this.plant.PAN="";
    this.plant.TAN_NO="";

this.GetALLPlantDetails();
  }


  openModalEdit(items, template) {
    this.dialog.open(template);
    // this.modalRef = this.modalService.show(template);
    // console.log(items.CompanyId)
    this.InputId = items.PlantId;
  }
  GetbusinnessId(){
    this.masterService.getBusinessIdForPlantDetails().subscribe((data:any)=>{
      console.log(data);
      this.BusinessIds=data;
    })
  }
  GetALLPlantDetails(){
    let obj={
      "PlantId":"0"
    }
    this.masterService.getAllPlantDetails(obj).subscribe((data:any)=>{
      console.log(data);
      this.allplantDeatils=data;
    })
  }
  onHide() {
    this.GetALLPlantDetails();
    this.dialog.closeAll();

  }
  onchangeBusinessId($event){
  this.plant.CompanyId=$event
  console.log(this.plant.CompanyId);
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.Status = data;
    })
  }
  onchangeStatus($event) {
    //console.log($event);
    if ($event == 'true') {
      this.plant.Status = 1;
    }
    else {
      this.plant.Status = 0;
    }
    //  console.log(this.ActiveStatus);
  }
}
