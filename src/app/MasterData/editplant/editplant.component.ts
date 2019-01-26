import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-editplant',
  templateUrl: './editplant.component.html',
  styleUrls: ['./editplant.component.css']
})
export class EditplantComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputPlantId:any;
  plantDetails:any={};
  Status:any=[];
  value:any;
  ////==========base64formatedata Varibles=========////
base64textString:any;
FileName:any;
FileType:any;
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputPlantId=this.Inputdata;
   //console.log(this.inputAccountNumber);
   let obj={
    "CompanyId":this.masterService.BusinessId,
    "PlantId":this.inputPlantId
   }
 this.masterService.getPlantDetailsByPlantId(obj).subscribe((data:any)=>{
   console.log(data);
   this.plantDetails=data[0];
 })
 this.masterService.getStatus().subscribe((data:any)=>{
  console.log(data);
  this.Status=data;
})
  }
}

updateRecords(){

  let object={
"PlantId":this.plantDetails.PlantId,
"PlantName":this.plantDetails.PlantName,
"Email":this.plantDetails.Email,
"AlternateEmail":this.plantDetails.AlternateEmail,
"Mobile":this.plantDetails.Mobile,
"AlternateMobile":this.plantDetails.AlternateMobile,
"Address1":this.plantDetails.Address1,
"Address2":this.plantDetails.Address2,
"Address3":this.plantDetails.Address3,
"CIN":this.plantDetails.CIN,
"GSTIN":this.plantDetails.GSTIN,
"PAN":this.plantDetails.PAN,
"TAN_NO":this.plantDetails.TAN_NO,
"BusinessId":this.masterService.BusinessId,
"Status":this.plantDetails.Status,
"FileDetails":{"FilePath":"",
"EncryptedFile":this.base64textString,
"FileExtn":this.FileType,
"UploadedFileName":this.FileName}
  }
  this.masterService.updatePlantDetails(object).subscribe((data:any)=>{
   // console.log(data);
    if(data !== 'null'){

      this.alertService.alert(AlertType.Success, data)
      this.Onclose();
    }else{
      this.alertService.alert(AlertType.Error,"Something went wrong");
      this.Onclose();
    }
  })
}
Onclose(){
  this.close.emit();
}

onchangeStatus($event){
if ($event == 'Active') {
  this.plantDetails.Status = 1;
}
else {
  this.plantDetails.Status = 0;
}
  console.log(this.plantDetails.Status);
}
handleFileSelect(evt){
  var File=evt.target.value;
   let subStringData=File.substr(12);
  var FileName = subStringData.split('.')[0];
  var FileType =subStringData.split('.')[1];
  this.FileName=FileName;
  this.FileType=FileType;

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
        this.base64textString= btoa(binaryString);
    
}
}
