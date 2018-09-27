import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import {WorkorderService} from '../workorder.service';
import { element } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'app-approveworkorder',
  templateUrl: './approveworkorder.component.html',
  styleUrls: ['./approveworkorder.component.css']
})
export class ApproveworkorderComponent implements OnInit {
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
InputWoId:any;
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
      "WOId":$event.node.data.Id
    }
    this.InputWoId=$event.node.data.Id;
    this.workOrderService.viewWorkOrderDetails(object).subscribe((data:any)=>{
      console.log(data);
      this.ubtDetails=data.ubt;
          this.woData=data.WOData;
          this.WOStatus=data.WOData[0].WOStatus;
    })
  }
  Approve(){
    let InputArray:any=[]
    this.woData.forEach(element=>{
      InputArray.push({
              "WOId":element.WOId,
              "TransporterId":element.TransporterId,
              "LoadingContId":element.LoadingContId,
              "UnloadingContId":element.UnloadingContId,
             "Status":'Approved'

      })
    })
    console.log(InputArray);
    this.workOrderService.approveWorkOrder(InputArray).subscribe((data:any)=>{
      console.log(data);

      if(data=='Success'){
        this.alertService.alert(AlertType.Success,"Approved Updated Sucessfully" )
        }
        else if(data=='No record updated')
        {
          this.alertService.alert(AlertType.Error,"No Record updated");
        }
        else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
        let object={
          "WOId": this.InputWoId
        }
       
        this.workOrderService.viewWorkOrderDetails(object).subscribe((data:any)=>{
          console.log(data);
          this.ubtDetails=data.ubt;
              this.woData=data.WOData;
              this.WOStatus=data.WOData[0].WOStatus;
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
