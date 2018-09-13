import { Component, OnInit } from '@angular/core';

import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import {PoService} from '../po.service';


@Component({
  selector: 'app-viewpo',
  templateUrl: './viewpo.component.html',
  styleUrls: ['./viewpo.component.css']
})
export class ViewpoComponent implements OnInit {
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
 


  constructor(private poService: PoService) {

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
           parent.push(element)
           element.children.forEach(element=>{
           // parent.push(element)
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
    //console.log($event.node.data.Id);
      let object={
      "POId":$event.node.data.Id
    }
    this.poService.getPoDetailsByPoId(object).subscribe((data:any)=>{

      this.currentPoId=data.POData[0].POId;
     this.currentPOStatus=data.POData[0].POStatus;
     console.log(this.currentPOStatus);
     console.log(this.currentPoId);
      this.viewPoDetails=data.POData;
      this.ubtdetailsByPoId=data.ubt;
     
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
