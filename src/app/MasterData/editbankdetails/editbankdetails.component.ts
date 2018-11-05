import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-editbankdetails',
  templateUrl: './editbankdetails.component.html',
  styleUrls: ['./editbankdetails.component.css']
})
export class EditbankdetailsComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputAccountNumber:any;
  bankDetails:any={};
  DeafaultAc:any;
  Status:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputAccountNumber=this.Inputdata;
   //console.log(this.inputAccountNumber);
   let obj={
    "AcNo":this.inputAccountNumber
   }
   this.masterService.gatBankDetailsbyACCNO(obj).subscribe((data:any)=>{
     console.log(data);
     this.bankDetails=data[0];
   })
   this.masterService.getStatus().subscribe((data:any)=>{
    console.log(data);
    this.Status=data;
  })
  }
}

updateRecords(){
  let inputobject={
"Id":this.bankDetails.Id,
"AcNo":this.bankDetails.AcNo,
"CompanyId":this.bankDetails.CompanyId,
"BankName":this.bankDetails.BankName,
"BranchName":this.bankDetails.BranchName,
"Location":this.bankDetails.Location,
"IFSC":this.bankDetails.IFSC,
"AcHolderName":this.bankDetails.AcHolderName,
"DefaultAc":this.DeafaultAc,
"Status":this.bankDetails.Status
  }
  this.masterService.upadteBankDetails(this.bankDetails).subscribe((data:any)=>{
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

changeDeafaultAc($event){
  this.DeafaultAc=$event.value;
  console.log(this.DeafaultAc)
   }
   onchangeStatus($event){
     
   }
}
