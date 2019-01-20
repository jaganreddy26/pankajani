import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.css']
})
export class AgencyEditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  agencyDetail:any={}
  Status:any=[];
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
     let obj={
      "AgencyId": this.Inputdata
      }
     this.masterService.getAgencyDetailsByAgencyId(obj).subscribe((data:any)=>{
       console.log(data);
       this.agencyDetail=data[0];
     })
     this.masterService.getStatus().subscribe((data:any)=>{
      console.log(data);
      this.Status=data;
    })
  }
  
  }
  updateRecords(){
    this.masterService.updateAgencyDetails(this.agencyDetail).subscribe((data:any)=>{
      if(data !== 'null'){

        this.alertService.alert(AlertType.Success, data);
        this.Onclose();
      }
      else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
        this.Onclose();
      }
    })
  
  }
  Onclose(){
    this.close.emit();
  }
  onchangeStatus($event){
  if($event=='Active'){
    this.agencyDetail.Status=1;
  }
  else{
    this.agencyDetail.Status=0;
  }
  console.log(this.agencyDetail.Status);
  }
}
