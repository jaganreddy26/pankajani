import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import {WorkorderService} from '../workorder.service';
import { element } from 'protractor';
@Component({
  selector: 'app-amendworkorder',
  templateUrl: './amendworkorder.component.html',
  styleUrls: ['./amendworkorder.component.css']
})
export class AmendworkorderComponent implements OnInit {
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
  inputpermissionId:any;
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
             parent.push(element)
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
    let object={
      "WOId":$event.node.data.Id,
      "CompanyId":localStorage.getItem('businessId')
    }
   // console.log(object);
    //this.inputpermissionId=$event.node.data.Id;
    // this.workOrderService.getWoSelection(object).subscribe((data:any)=>{
    //   console.log(data);
    // })
    this.workOrderService.viewWorkOrderDetails(object).subscribe((data:any)=>{
      console.log(data);
      this.ubtDetails=data.ubt;
          this.woData=data.WOData;
          this.WOStatus=data.WOData[0].WOStatus;
    })
  }
  Update(){
    let InputArray:any=[]
    this.woData.forEach(element=>{
      InputArray.push({
        "CompanyId":localStorage.getItem('businessId'),
        "TransporterId":element.TransporterId,
        "TransporterAmount":element.TransporterAmount,
        "LoadingContId":element.LoadingContId,
        "LoadingContAmount":element.LoadingContAmount,
        "UnloadingContId":element.UnloadingContId,
        "UnloadingContAmount":element.UnloadingContAmount,
        "Quantity":element.Quantity,
        "WOId":element.WOId,
        "PermissionId":element.PermissionId,
        
      })
    })
  // console.log(InputArray);
    this.workOrderService.updateWorkOrderDetails(InputArray).subscribe((data:any)=>{
     // console.log(data);
     if(data !== 'null'){

      this.alertService.alert(AlertType.Success, data)
    }else{
      this.alertService.alert(AlertType.Error,"Something went wrong");
    }
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
