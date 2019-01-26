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
////==========base64formatedata Varibles=========////
base64textString:any;
FileName:any;
FileType:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) { 
//this.GetbusinnessId();
this.plant.CompanyId=this.masterService.BusinessId;
  this.GetStatus();
  this.GetALLPlantDetails();
  }

  ngOnInit() {
  }
  save(){
    
 console.log(this.plant)

    this.masterService.savePlantDetails(this.plant).subscribe((data:any)=>{
      console.log(data);
      if (data !== 'null') {

        this.alertService.alert(AlertType.Success, data);
        this.GetALLPlantDetails();
      } else {
        this.alertService.alert(AlertType.Error, "Something went wrong");
        this.GetALLPlantDetails();
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
    this.value="";

  }


  openModalEdit(items, template) {
    this.dialog.open(template);
    // this.modalRef = this.modalService.show(template);
    // console.log(items.CompanyId)
    this.InputId = items.PlantId;
  }
  // GetbusinnessId(){
  //   this.masterService.getBusinessIdForPlantDetails().subscribe((data:any)=>{
  //     console.log(data);
  //     this.BusinessIds=data;
  //   })
  // }
  GetALLPlantDetails(){
    let obj={
      "CompanyId":this.masterService.BusinessId,
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
 
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.Status = data;
    })
  }
  onchangeStatus($event) {
    //console.log($event);
    if ($event == 'Active') {
      this.plant.Status = 1;
    }
    else {
      this.plant.Status = 0;
    }
      console.log(this.plant.Status);
  }
  handleFileSelect(evt){
    var File=evt.target.value;
     let subStringData=File.substr(12);
    var FileName = subStringData.split('.')[0];
    var FileType =subStringData.split('.')[1];
  //  this.FileName=FileName;
  //  this.FileType=FileType;
  this.plant.FileDetails.UploadedFileName=FileName;
  this.plant.FileDetails.FileExtn=FileType;
   var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
 
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
         // this.base64textString= btoa(binaryString);
      //  this.FileDetails.EncryptedFile=btoa(binaryString);
       this.plant.FileDetails.EncryptedFile=btoa(binaryString);
       this.plant.FileDetails.FilePath="";
  }
 
}
