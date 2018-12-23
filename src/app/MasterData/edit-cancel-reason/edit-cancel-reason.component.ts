import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-edit-cancel-reason',
  templateUrl: './edit-cancel-reason.component.html',
  styleUrls: ['./edit-cancel-reason.component.css']
})
export class EditCancelReasonComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputobject:any;
  cancellationReasonDetails:any={};
  Status:any=[];
  AreaBusinessDetails:any;
  ActiveStatus:any;
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputobject=this.Inputdata;
  console.log(this.inputobject);
  this.masterService.getCancellationReasonDetailsBYID(this.inputobject).subscribe((data:any)=>{
    console.log(data);
    this.cancellationReasonDetails=data[0];
  })
  this.masterService.getStatus().subscribe((data:any)=>{
    //console.log(data);
    this.Status=data;
  })
  }

  }
  updateRecords(){
    let object={
      "CompanyId":this.cancellationReasonDetails.CompanyId,
      "Id":this.cancellationReasonDetails.Id,
      "Name":this.cancellationReasonDetails.Name,
      "Status":this.ActiveStatus
      }
      console.log(object);
      this.masterService.updateCancellationReasonDetails(object).subscribe((data:any)=>{
        console.log(data);
        if(data !== 'null'){

          this.alertService.alert(AlertType.Success, data)
        }else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
        this.Onclose();
      })
     
  }

        Onclose(){
          this.close.emit();
        }



  onchangeStatus($event){
    if($event==true)
    this.ActiveStatus=1;

  else
    this.ActiveStatus=0;
  }

}
