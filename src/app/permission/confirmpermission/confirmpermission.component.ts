import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { element } from 'protractor';
@Component({
  selector: 'app-confirmpermission',
  templateUrl: './confirmpermission.component.html',
  styleUrls: ['./confirmpermission.component.css']
})
export class ConfirmpermissionComponent implements OnInit {
  customer: any = []
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  value:any;
  StatusName:any;
  status:any=[];
  PermissionStatus:any;
  InputPermissionId:any;
      ///
     //step 2 for Tree struture
     nodes:any=[];
     //STEP2
   options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
      ////////////
      ubtDetails:any={}
      PermissionDetails:any=[];
  constructor(private permissionService:PermissionService,private alertService :AlertService) {
    this.getCustomer();
   }

   ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.permissionService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  getCustomer() {
    this.permissionService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }
  search(){
    this.businessId = this.permissionService.BusinessId;
    this.customerId = this.Id;
    //console.log(this.customerId);
    if (this.fromDateChanged == false) {
      this.FromDate.toLocaleDateString();
      var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
      this.FromDate = fromdate;
      this.fromDateChanged = true
    }
    if (this.toDateChanged == false) {
      this.ToDate.toLocaleDateString();
      var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
      this.ToDate = todate;
      this.toDateChanged =true;
    }
    let object = {
      'BusinessId': this.businessId,
      'CustomerId': this.customerId,
      'FromDate': this.FromDate,
      'ToDate': this.ToDate,
      'Status':this.StatusName
    }
    this.permissionService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
      console.log(this.ids)
      let all:any=[]
      let parent:any=[]
      let children:any=[];
       //step 3 for Tree struture
       this.ids.forEach(element => {
        element.TCategory.forEach(element => {
         // parent.push(element)
         element.children.forEach(element =>{
          // parent.push(element)
           element.children.forEach(element=>{
           parent.push(element)
          //  element.children.forEach(element=>{
          //    parent.push(element)
          //  })
           })
         })
        });
        });
        this.nodes = parent;
    })
  }
  onActivate($event){
    let obj={
      'PermissionId':$event.node.data.Id
     }
     this.InputPermissionId=$event.node.data.Id
     this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
       console.log(data);
       this.ubtDetails=data.ubt;
       this.PermissionDetails=data.PermissionData;
       this.PermissionStatus=data.PermissionData[0].PermissionStatus;
       console.log(this.PermissionStatus)
     })
  }
  confirm(){
    let array:any=[];
    this.PermissionDetails.forEach(element=>{
      array.push({
        "PermissionId":element.PermissionId,
        "TransporterId":element.TransporterId,
        "LoadingContId":element.LoadingContId,
        "UnloadingContId":element.UnloadingContId,
        "Status":'Confirmed'

      })
    })
   // console.log(array);
   this.permissionService.confirmPermission(array).subscribe((data:any)=>{
     console.log(data);
     if(data=='Success'){
      this.alertService.alert(AlertType.Success,"Confirmed Sucessfully " )
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
      }
      let obj={
        'PermissionId':this.InputPermissionId
       }
       this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
         console.log(data);
         this.ubtDetails=data.ubt;
         this.PermissionDetails=data.PermissionData;
         this.PermissionStatus=data.PermissionData[0].PermissionStatus;
         console.log(this.PermissionStatus)
       })
   })
  }
  onchange($event) {
    this.Id = $event
  }
  fromDateChange() {
    this.fromDateChanged = true;
    this.FromDate.toLocaleDateString();
    var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
    this.FromDate = fromdate;

  }
  toDateChange() {
    this.toDateChanged = true;
    this.ToDate.toLocaleDateString();
    var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
    this.ToDate = todate;
  }



}
