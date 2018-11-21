import { Component, OnInit ,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-edit-area-business',
  templateUrl: './edit-area-business.component.html',
  styleUrls: ['./edit-area-business.component.css']
})
export class EditAreaBusinessComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputObject:any={}
  AreaBusinessDetails:any={};
  Status:any=[];
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputObject=this.Inputdata;
  // console.log(this.inputObject);
 
   this.masterService.getAreaBusinessDetails(this.inputObject).subscribe((data:any)=>{
   //console.log(data);
     this.AreaBusinessDetails=data[0]
   })
   this.masterService.getStatus().subscribe((data:any)=>{
    //console.log(data);
    this.Status=data;
  })
    }
  }
  updateRecords(){

let UpdatedDataInput={
  "Id":this.AreaBusinessDetails.Id,
  "Name":this.AreaBusinessDetails.Name,
  "Status":this.AreaBusinessDetails.Status
  
}
// console.log(UpdatedDataInput);
this.masterService.updateAreaOfBusinessDetails(UpdatedDataInput).subscribe((data:any)=>{
  console.log(data);
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
    this.AreaBusinessDetails.Status=1;

  else
    this.AreaBusinessDetails.Status=0;
  }
}
