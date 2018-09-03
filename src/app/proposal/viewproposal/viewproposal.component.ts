import { Component, OnInit } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
@Component({
  selector: 'app-viewproposal',
  templateUrl: './viewproposal.component.html',
  styleUrls: ['./viewproposal.component.css']
})
export class ViewproposalComponent implements OnInit {
  customer: any = []
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  status:any=[];
  StatusName:any;
  value:any;

  ProposalsDetailsByID:any=[]
  UbtId:any;
  CategoryId:any;
  CategoryName:any;
  CustomerName:any;
  Quantity:any;
  GoodsType:any;
  AgencyName:any;
  ProposalId:any;
  //step 2 for Tree struture
  nodes:any=[];
  options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
  constructor(private proposalService: ProposalServiceService) {
    this.getCustomer();
   }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.proposalService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  getCustomer() {
    this.proposalService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }

  
  search() {

    this.businessId = this.proposalService.BusinessId;
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
    this.proposalService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
      let all:any=[]
      let parent:any=[]
      let children:any=[];
      console.log(this.ids)
      this.ids.forEach(element => {
        element.TCategory.forEach(element1 => {
        children.push({'Id':element1.Id,'Name':element1.Name,'GoodsType':element1.GoodsTypes,'UbtId':element1.UbtId,'children':element1.TProposal})
        })
        parent.push({'Id':element.UbtId,'Name':element.UbtId,'children':children})
      });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;
    // this.nodes.forEach(element => {
    //   element.children.forEach(element1 => {
    //     element.children.push({'Id':element.Id,'Name':element.Name,'children':element.TProposal})
    //   });
    // });
    // console.log(children)
      // this.nodes.prototy
      console.log(this.nodes)

    })

  }
  onActivate($event){
//console.log("hi")
//console.log($event.node.data.Id);
let obj ={
  'ProposalId': $event.node.data.Id,
}
this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
  //console.log(data);
  this.ProposalsDetailsByID=data;
  this.UbtId=data[0].UbtId,
  this.CategoryId=data[0].CategoryId,
  this.CategoryName=data[0].CategoryName,
  this.CustomerName=data[0].CustomerName,
  this.Quantity=data[0].Quantity,
  this.GoodsType=data[0].GoodsType,
  this.AgencyName=data[0].AgencyName,
  this.ProposalId=data[0].ProposalId
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
