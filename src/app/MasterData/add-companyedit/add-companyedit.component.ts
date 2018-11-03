import { Component, OnInit ,Input,SimpleChanges,EventEmitter,Output} from '@angular/core';
import {MasterService} from '../master.service';
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
  constructor(private masterService:MasterService) { }

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
    console.log(this.companyDetails);
 
      
    this.Onclose();
  }
  Onclose(){
    this.close.emit();
  }

}
