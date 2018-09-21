import { Component, OnInit, Input,SimpleChanges } from '@angular/core';
import {PermissionService} from '../permission.service';
@Component({
  selector: 'app-editamendpermission',
  templateUrl: './editamendpermission.component.html',
  styleUrls: ['./editamendpermission.component.css']
})
export class EditamendpermissionComponent implements OnInit {
@Input() Input;
inputfromEmendPermission:any={};
EditPermissionDetails:any;
  constructor(private permissionService:PermissionService) { }

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
}
