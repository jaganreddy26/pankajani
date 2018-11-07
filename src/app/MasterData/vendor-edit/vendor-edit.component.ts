import { Component, OnInit ,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputVendorData:any={}
  vendorDetails:any={}
  Status:any=[]
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputVendorData=this.Inputdata;
  //  console.log(this.inputVendorData);
 this.masterService.getVendorDetailsByVendorId(this.inputVendorData).subscribe((data:any)=>{
  //console.log(data);
   this.vendorDetails=data[0];
  // console.log(this.vendorDetails);
 })
 this.masterService.getStatus().subscribe((data:any)=>{
  //console.log(data);
  this.Status=data;
})
  }
}
updateRecords(){
  this.masterService.updateVendorDetails(this.vendorDetails).subscribe((data:any)=>{
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
  this.vendorDetails.Status=1;

else
  this.vendorDetails.Status=0;
}


}
