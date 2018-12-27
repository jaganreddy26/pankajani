import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import {PoService} from '../po.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-cancelpo',
  templateUrl: './cancelpo.component.html',
  styleUrls: ['./cancelpo.component.css']
})
export class CancelpoComponent implements OnInit {
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
  //ViewPo details
  viewPoDetails:any=[];
  ubtdetailsByPoId:any={};
  currentPoId:any;
  currentPOStatus:any;
    //step 2 for Tree struture
    nodes:any=[];
    //STEP2
  options: ITreeOptions = {
   displayField: 'Name',
   isExpandedField: 'expanded',
   idField: 'Id',
   hasChildrenField: 'nodes',
   
 }
 ////
 CancelReason:any=[];
 viewdata:any;
 UbtData:any={};
 POData:any={};
 PermissionData:any={};
 workorder:any=[];
 CancelPermission:any;
 CancelWO:any;
 canceldDate:any = new Date();
 CompansationFrom:any;
 CompansationTo:any;
 CompletedQuantity:any;
 canceldDateChanged: boolean = true;
 POID:any;
 CancelReasonID:any;

  constructor(private poService: PoService,private alertService :AlertService) {
    this.getCustomer();
   }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.poService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  getCustomer() {
    this.poService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }
  search() {

    this.businessId = this.poService.BusinessId;
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
      this.toDateChanged = true;
    }
    let object = {
      'BusinessId': this.businessId,
      'CustomerId': this.customerId,
      'FromDate': this.FromDate,
      'ToDate': this.ToDate,
      'Status':this.StatusName
    }
    this.poService.getUbtIds(object).subscribe((data: any) => {
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
           })
         })
        });
        });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;
console.log(this.nodes);

    })

  }

  onActivate($event){
    this.POID=$event.node.data.Id
    this.viewdata=1
   // console.log($event.node.data.Id);
      let object={
        "CompanyId":localStorage.getItem('businessId'),
      "POId":$event.node.data.Id
    }
 this.poService.getCancelPOData(object).subscribe((data:any)=>{
   console.log(data);
   this.UbtData=data.UbtData;
   this.POData=data.POData;
   this.PermissionData=data.PermissionData;
   this.workorder=data.WO;

 })
 let object1={
  "BusinessId":localStorage.getItem('businessId'),
}
 this.poService.GetCancelReason(object1).subscribe((data:any)=>{
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
  canceldDateChange() {
    this.canceldDateChanged = true;
    this.canceldDate.toLocaleDateString();
   // var canceldDate = this.canceldDate.getFullYear() + '-' + (this.canceldDate.getMonth() + 1) + '-' + this.canceldDate.getDate();
    var canceldDate = this.canceldDate.getDate() +'-'+(this.canceldDate.getMonth() + 1) + '-'+this.canceldDate.getFullYear();
    this.canceldDate = canceldDate;

  }
  changeCancelPermission($event) {
    this.CancelPermission = $event.value;
    console.log(this.CancelPermission);
  }
  changeCancelWO($event){
    this.CancelWO =$event.value;
    console.log(this.CancelWO);
  }
  save(){
let object={
  "POId":this.POID,
  "CancelId":this.CancelReasonID,
  "CompensationFrom":this.CompansationFrom,
  "CompensationTo":this.CompansationTo,
  "CompletedQuantity":this.CompletedQuantity,
  "CancelPermission":this.CancelPermission,
  "CancelWO":this.CancelWO,
  "CancelledOn":this.canceldDate
}
this.poService.SaveCancelPO(object).subscribe((data:any)=>{
  console.log(data);
  if (data !== 'null') {

    this.alertService.alert(AlertType.Success, data)
  } else {
    this.alertService.alert(AlertType.Error, "Something went wrong");
  }
})
  }
}
