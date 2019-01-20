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
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputPlantId=this.Inputdata;
   //console.log(this.inputAccountNumber);
   let obj={
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
  this.masterService.updatePlantDetails(this.plantDetails).subscribe((data:any)=>{
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
}
