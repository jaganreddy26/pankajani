import { Component, OnInit, Input,SimpleChanges,Output,EventEmitter } from '@angular/core';
import {PermissionService} from '../permission.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-editamendpermission',
  templateUrl: './editamendpermission.component.html',
  styleUrls: ['./editamendpermission.component.css']
})
export class EditamendpermissionComponent implements OnInit {
@Input() Input;
@Output() close:EventEmitter <any> = new EventEmitter();
inputfromEmendPermission:any={};
EditPermissionDetails:any={};
  constructor(private permissionService:PermissionService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Input']) {
      this.inputfromEmendPermission=this.Input;
     // console.log(this.inputfromEmendPermission);
     this.permissionService.editPermissionSelectionOfIndividual(this.inputfromEmendPermission).subscribe((data:any)=>{
       console.log(data);
       this.EditPermissionDetails=data[0];
     })
    }
  }
  updateRecord(){
    let obj={
  "PermissionId":this.EditPermissionDetails.PermissionId,
  "TransporterId":this.EditPermissionDetails.TransporterId,
  "TransporterAmount": this.EditPermissionDetails.TransporterAmount,
  "LoadingContId": this.EditPermissionDetails.LoadingContractorId,
  "LoadingContAmount": this.EditPermissionDetails.LoadingContractorAmount,
  "UnloadingContId": this.EditPermissionDetails.UnLoadingContractorId,
  "UnloadingContAmount": this.EditPermissionDetails.UnLoadingContractorAmount,
  "SuppliedQty":this.EditPermissionDetails.SuppliedQty,
  "SuppliedPrice":this.EditPermissionDetails.SuppliedPrice,
  "POId":34

    }
   //console.log(obj);
    this.permissionService.updateIndividualRecords(obj).subscribe((data:any)=>{
      console.log(data);
      if(data=='Success'){
        this.alertService.alert(AlertType.Success,"Record Updated Sucessfully" )
        }else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
      this.Onclose();
    })
  }
  Onclose(){
    this.close.emit();
  }
}
