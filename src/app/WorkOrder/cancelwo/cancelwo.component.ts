import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import {WorkorderService} from '../workorder.service';
@Component({
  selector: 'app-cancelwo',
  templateUrl: './cancelwo.component.html',
  styleUrls: ['./cancelwo.component.css']
})
export class CancelwoComponent implements OnInit {
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

   //step 2 for Tree struture
   nodes:any=[];
   //STEP2
 options: ITreeOptions = {
  displayField: 'Name',
  isExpandedField: 'expanded',
  idField: 'Id',
  hasChildrenField: 'nodes',
  
}
ubtDetails:any={};
woData:any=[];
WOStatus:any;
 /////////////////////
 workorderId:any;
 viewdata:any;
 CancelReason:any=[];
 UbtData:any={};
  POData:any={};
  PermissionData:any={};
  workorder:any=[];
  canceldDateChanged: any = new Date();
 canceldDateChange: boolean = false;
  CancelReasonID:any;
  // CancelPurchaseOrder:any;
  // CancelWO:any;
  canceldDate:any = new Date();
  CompansationFrom:any;
  CompansationTo:any;
  CompletedQuantity:any;
  CreatedBy:any;
  constructor(private workOrderService:WorkorderService,private alertService :AlertService) { 
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.workOrderService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  
  getCustomer() {
    this.workOrderService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }

  search(){
    this.businessId = this.workOrderService.BusinessId;
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
    this.workOrderService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
    //  console.log(this.ids)
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
          // parent.push(element)
           element.children.forEach(element=>{
           //  parent.push(element)
           element.children.forEach(element => {
             parent.push(element)
           });
           })
           })
         })
        });
        });
        this.nodes = parent
    })
  }
  onActivate($event){
    this.viewdata=1;
    this.workorderId=$event.node.data.Id
    let object={
      "WOId":$event.node.data.Id,
      "CompanyId":localStorage.getItem('businessId')
    }
//  console.log(object);
this.workOrderService.getCancelWOData(object).subscribe((data:any)=>{
 // console.log(data);
  this.UbtData=data.UbtData;
  this.POData=data.POData;
  this.PermissionData=data.PermissionData;
  this.workorder=data.WO;
})
let object1={
  "BusinessId":localStorage.getItem('businessId'),
}
 this.workOrderService.GetCancelReason(object1).subscribe((data:any)=>{
   console.log(data);
   this.CancelReason=data
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
  onchangeCancelReason($event){
    this.CancelReasonID=$event;
    console.log(this.CancelReasonID)
  }
  oncanceldDateChange() {
    this.canceldDateChange = true;
    this.canceldDate.toLocaleDateString();
   // var canceldDate = this.canceldDate.getFullYear() + '-' + (this.canceldDate.getMonth() + 1) + '-' + this.canceldDate.getDate();
    var canceldDate = this.canceldDate.getDate() +'-'+(this.canceldDate.getMonth() + 1) + '-'+this.canceldDate.getFullYear();
    this.canceldDate = canceldDate;
console.log(this.canceldDate);
  }
  // changeCancelPurchaseOrder($event) {
  //   this.CancelPurchaseOrder = $event.value;
  //   console.log(this.CancelPurchaseOrder);
  // }
  // changeCancelWO($event){
  //   this.CancelWO =$event.value;
  //   console.log(this.CancelWO);
  // }
  save(){
      let Inputarray:any=[];
    this.workorder.forEach(element=>{
      Inputarray.push({
        "InternalId":element.InternalId,
        "WOId":element.WOId,
        "TransporterId":element.TransporterId,
        "LoadingContId":element.LoadingContId,
        "UnloadingContId":element.UnloadingContId,
        "CompletedQuantity":element.CompletedQuantity,
        "CompensationTo":this.CompansationTo,
        "CompensationFrom":this.CompansationFrom,
        "CancelId":this.CancelReasonID,
        "CancelledOn":this.canceldDate

      })
    })
   // console.log(Inputarray);
   this.workOrderService.saveCancelWorkOrder(Inputarray).subscribe((data:any)=>{
     console.log(data);
     if (data !== 'null') {

      this.alertService.alert(AlertType.Success, data)
    } else {
      this.alertService.alert(AlertType.Error, "Something went wrong");
    }
   })
   this.CompletedQuantity="";
   this.CompansationFrom="";
   this.CompansationTo="";
   this.CancelReasonID="";
  }
}
