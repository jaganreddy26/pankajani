import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import {WorkorderService} from '../workorder.service';
@Component({
  selector: 'app-revised-wo',
  templateUrl: './revised-wo.component.html',
  styleUrls: ['./revised-wo.component.css']
})
export class RevisedWOComponent implements OnInit {
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
WOID:any;
ReasonName:any=[];
ChangeQuantity:any=[];
viewdata:any;
SplitReason:any;

UbtData:any={};
POData:any={};
PermissionData:any={};
workorder:any=[];
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
          // parent.push(element)
          element.children.forEach(element=>{
            parent.push(element)
          })
         })
         })
       })
      });
      });
  
  //step 4 for Tree struture here the tree struture we form in the HTML
    this.nodes = parent;
  })
}
onActivate($event){
  this.viewdata=1
  let object={
    "WOId":$event.node.data.Id,
   "CompanyId":localStorage.getItem('businessId')
  }
  this.WOID=$event.node.data.Id
  //console.log(object);
  this.workOrderService.GetSplitReason().subscribe((data:any)=>{
    console.log(data);
    this.ReasonName=data;
  })

  let array:any=[
                 {'Reason':'YES'},
                 {'Reason':'NO'}
                ];

  this.ChangeQuantity=array;

  this.workOrderService.GetSplitWOData(object).subscribe((data:any)=>{
    console.log(data);
    this.UbtData=data.UbtData;
    this.POData=data.POData;
    this.PermissionData=data.PermissionData;
    this.workorder=data.WO;
  })

}

Save(){
  let SplitWOData:any=[];

  this.workorder.forEach(element => {
    SplitWOData.push({
      "InternalId":element.InternalId,
      "WOId":element.WOId,
      "TransporterId":element.TransporterId,
      "TransporterAmount":element.TransporterAmount,
      "LoadingContId":element.LoadingContId,
      "LoadingContAmount":element.LoadingContAmount,
      "UnloadingContId":element.UnloadingContId,
      "UnloadingContAmount":element.UnloadingContAmount,
      "CompletedQuantity":element.CompletedQuantity
    })
  });
  let object={
    "SplitWOData":SplitWOData,
    "SplitReason":this.SplitReason,
    "CompanyId":localStorage.getItem('businessId'),
  }
  console.log(object);
  this.workOrderService.saveSplitWo(object).subscribe((data:any)=>{
    console.log(data);
    this.alertService.alert(AlertType.Success,data);
  })
}

onchangeChangeQuantity($event){
  console.log($event);
}
onchangeReasonName($event){
  this.SplitReason=$event
//  console.log(this.SplitReason)
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
