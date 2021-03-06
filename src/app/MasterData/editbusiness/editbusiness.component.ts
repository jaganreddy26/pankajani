import { Component, OnInit ,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-editbusiness',
  templateUrl: './editbusiness.component.html',
  styleUrls: ['./editbusiness.component.css']
})
export class EditbusinessComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputBusinessid:any;
  ////////////
  value:any;
  businessDetails:any={}
  Status:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputBusinessid=this.Inputdata;
   //console.log(this.inputBusinessid);
   let obj={
    "Id":this.inputBusinessid
   }
   this.masterService.getBusinessDetailsById(obj).subscribe((data:any)=>{
    // console.log(data);
     this.businessDetails=data[0]
   })
   this.masterService.getStatus().subscribe((data:any)=>{
    console.log(data);
    this.Status=data;
  })
    }
  }
  updateRecords(){
    let inputObject={
      "Id":this.businessDetails.Id,
      "Name":this.businessDetails.Name,
      "ActiveStatus":this.businessDetails.ActiveStatus
    }
    this.masterService.UpdateBusinessDetail(inputObject).subscribe((data:any)=>{
      console.log(data);
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
     if($event=='Active'){
      this.businessDetails.ActiveStatus=1;
    }
    else{
      this.businessDetails.ActiveStatus=0;
    }
    console.log(this.businessDetails.ActiveStatus);
  }

}
