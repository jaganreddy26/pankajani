import { Component, OnInit } from '@angular/core';
import { PoService } from "../po.service";
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
@Component({
  selector: 'app-revised-po',
  templateUrl: './revised-po.component.html',
  styleUrls: ['./revised-po.component.css']
})
export class RevisedPOComponent implements OnInit {
  ReasonName:any;
  customer: any = [];
  status:any=[];
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  POIDInput:any;

  ChangeQuantity:any=[];
  StatusName:any;
  viewdata:any;

  CompletedQuantity:any;
  RevisedPrice:any;
  SplitReason:any;

      //step 2 for Tree struture
      nodes:any=[];
      //STEP2
    options: ITreeOptions = {
     displayField: 'Name',
     isExpandedField: 'expanded',
     idField: 'Id',
     hasChildrenField: 'nodes',
     
   }
   /////////////////////***///////////////
   UbtData:any={};
   POData:any={};
   PermissionData:any={};
   workorder:any=[];
   value:any;
  constructor(private poservice: PoService,private alertService :AlertService) { 
  
    let object = {
      ObjectType: 'UBT' 
    };
    this.poservice.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
    this.getCustomer();
  }
 
  ngOnInit() {
  }
  getCustomer() {
    this.poservice.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }
  search() {

    this.businessId = this.poservice.BusinessId;
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
    this.poservice.getUbtIds(object).subscribe((data: any) => {
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
    this.viewdata=1
    //console.log($event.node.data.Id);
      let object={
        // "CompanyId":localStorage.getItem('businessId'),
      "POId":$event.node.data.Id
    }
    this.POIDInput=$event.node.data.Id
   
      this.poservice.GetSplitReason().subscribe((data:any)=>{
      console.log(data);
      this.ReasonName=data;
    })

    let array:any=[
                   {'Reason':'YES'},
                   {'Reason':'NO'}
                  ];

    this.ChangeQuantity=array;

    this.poservice.GetSplitPOData(object).subscribe((data:any)=>{
      console.log(data);
      this.UbtData=data.UbtData;
      this.POData=data.POData;
      this.PermissionData=data.PermissionData;
      this.workorder=data.WO;
    })
this.CompletedQuantity=0;

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
"CompanyId":localStorage.getItem('businessId'),
"POId":this.POIDInput,
"CompletedQty":this.CompletedQuantity,
"RevisedPrice":this.RevisedPrice,
"SplitReason":this.SplitReason,
"PermissionId":this.PermissionData.PermissionId,
"SplitWOData":SplitWOData
}
// console.log(object);
this.poservice.saveSplitPo(object).subscribe((data:any)=>{
  console.log(data);
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
