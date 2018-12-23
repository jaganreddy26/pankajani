import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-editpaymentreason',
  templateUrl: './editpaymentreason.component.html',
  styleUrls: ['./editpaymentreason.component.css']
})
export class EditpaymentreasonComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputobject:any;
  paymentReasonDetails:any={};
  Status:any=[];
  ActiveStatus:any;
  value:any;
  constructor(private masterService: MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputobject=this.Inputdata;
  console.log(this.inputobject);
  this.masterService.GetPaymentReasonDetailsBYID(this.inputobject).subscribe((data:any)=>{
    console.log(data);
    this.paymentReasonDetails=data[0];
  })
  this.masterService.getStatus().subscribe((data:any)=>{
    //console.log(data);
    this.Status=data;
  })
  }

  }
  updateRecords(){
     let obj={
          "CompanyId":this.paymentReasonDetails.CompanyId,
          "Id":this.paymentReasonDetails.Id,
          "Name":this.paymentReasonDetails.Name,
          "Status":this.ActiveStatus
    }
    this.masterService.UpdatePaymentReasonDetails(obj).subscribe((data:any)=>{

     if(data !== 'null'){

           this.alertService.alert(AlertType.Success, data)
        }
        else
        {
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
