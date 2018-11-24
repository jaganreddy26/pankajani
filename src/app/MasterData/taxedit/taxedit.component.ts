import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-taxedit',
  templateUrl: './taxedit.component.html',
  styleUrls: ['./taxedit.component.css']
})
export class TaxeditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputobject:any;
  taxDetails:any={};
  Status:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputobject=this.Inputdata;
   //console.log(this.inputobject);
  
 this.masterService.getGoodsDetailsById(this.inputobject).subscribe((data:any)=>{
   console.log(data);
   this.taxDetails=data[0];
 })
 this.masterService.getStatus().subscribe((data:any)=>{
  console.log(data);
  this.Status=data;
})
  }
}
//upading here
updateRecords(){
this.masterService.UpdateTAXGoodsDetails(this.taxDetails).subscribe((data:any)=>{
  // console.log(data);
  if(data !== 'null'){

    this.alertService.alert(AlertType.Success, data)
  }else{
    this.alertService.alert(AlertType.Error,"Something went wrong");
  }
})
this.Onclose();
}
Onclose(){
  this.close.emit();
}

onchangeStatus($event){
  if($event==true)
  this.taxDetails.Status=1;

else
  this.taxDetails.Status=0;
}

}
