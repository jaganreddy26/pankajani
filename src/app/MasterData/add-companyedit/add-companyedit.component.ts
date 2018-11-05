import { Component, OnInit ,Input,SimpleChanges,EventEmitter,Output} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-add-companyedit',
  templateUrl: './add-companyedit.component.html',
  styleUrls: ['./add-companyedit.component.css']
})
export class AddCompanyeditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputCompanyId:any;
  companyDetails:any={};

  Status:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputCompanyId=this.Inputdata;
   console.log(this.inputCompanyId);
   let obj={
    "CompanyId":this.inputCompanyId
   }
   this.masterService.getCompanyDetailsByid(obj).subscribe((data:any)=>{
    //  console.log(data);
     this.companyDetails=data[0];
     //console.log(this.companyDetails)
;   })
this.masterService.getStatus().subscribe((data:any)=>{
  console.log(data);
  this.Status=data;
})

    }
  }
  updateRecords(){
    // console.log(this.companyDetails);
let inputobject={
  "CompanyId":this.companyDetails.CompanyId,
"CompanyName":this.companyDetails.CompanyName,
"Email":this.companyDetails.Email,
"AlternateEmail":this.companyDetails.AlternateEmail,
"Mobile":this.companyDetails.Mobile,
"AlternateMobile":this.companyDetails.AlternateMobile,
"Address1":this.companyDetails.Address1,
"Address2":this.companyDetails.Address2,
"Address3":this.companyDetails.Address3,
"CIN":this.companyDetails.CIN,
"GSTIN":this.companyDetails.GSTIN,
"PAN":this.companyDetails.PAN,
"TAN_NO":this.companyDetails.TAN_NO,
"Status":this.companyDetails.Status
}

 console.log(inputobject);
      this.masterService.UpdateCompanyDetails(inputobject).subscribe((data:any)=>{
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
    this.companyDetails.Status=1;

  else
    this.companyDetails.Status=0;
  }
}
