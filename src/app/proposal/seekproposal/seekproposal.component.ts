import { Component, OnInit } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-seekproposal',
  templateUrl: './seekproposal.component.html',
  styleUrls: ['./seekproposal.component.css']
})
export class SeekproposalComponent implements OnInit {
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
//step 2 for Tree struture
   nodes:any=[];
//details about seek from tree structure
  seekProposalsDetails:any;
  transporter:any=[];
  loadingContractor:any=[];
  unloadingContractor:any[];
 //adding the seekProposal details;
 ubtidInput:any;
 categoryidInput:any;
 goodstypeInput:any;
 selectedTransporter:any;
 transporterRate:any;
 selectedLoadingContractor:any;
 loadingRate:any;
 selectedUnLoadingContractor:any;
 unloadingRate:any;
 addedSeekProposalDetails:any=[];
 
 allSeekProposalDetails:any=[]
 //STEP2
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

    }
    this.proposalService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
      console.log(this.ids)
      let all:any=[]
      let parent:any=[]
      let children:any=[];
       //step 3 for Tree struture
       this.ids.forEach(element => {
        parent.push({'Id':element.UbtId,'Name':element.UbtId,'children':element.TCategory})
      });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;

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
  
  //step 5 when we click any perticular item in tree events
  onActivate($event){   
    if($event.node.data.children){

    }
    else{
      let obj = {
        'CategoryId': $event.node.data.Id,
        'GoodsType':$event.node.data.GoodsTypes,
        'Status': 'Open',
        UbtId:$event.node.data.UbtId,

      }
   //  console.log(obj);
     this.proposalService.getSeekProposals(obj).subscribe((data:any)=>{
      //  console.log(data);
       this.seekProposalsDetails=data[0];
     //console.log(this.seekProposalsDetails)
     this.ubtidInput=this.seekProposalsDetails.UbtId;
     this.categoryidInput=this.seekProposalsDetails.CategoryId;
     this.goodstypeInput=this.seekProposalsDetails.GoodsType;
     });
    // objectTypeTransport type Input Object
     let objectTypeTransport = {
      ObjectType: 'Transport' 
    };
  // objectTypeLoading type Input Object
    let objectTypeLoading = {
      ObjectType: 'Loading' 
    };
  // objectTypeUnloading type Input Object
   let objectTypeUnloading = {
      ObjectType: 'Unloading' 
    };

     this.proposalService.getVendor(objectTypeTransport).subscribe((data:any)=>{
     //console.log(data);
       this.transporter=data;
     });

     this.proposalService.getVendor(objectTypeLoading).subscribe((data:any)=>{
   //console.log(data);
      this.loadingContractor=data;
    });

    this.proposalService.getVendor(objectTypeUnloading).subscribe((data:any)=>{
    //console.log(data);
     this.unloadingContractor=data;
    });

    }
  }

  onchangeTransporter($event){
    this.selectedTransporter=$event;
   // console.log(this.selectedTransporter)
  }
  onchangeLoadingContractor($event){
    this.selectedLoadingContractor=$event;
    //console.log(this.selectedLoadingContractor)
  }
  onchangeUnLoadingContractor($event){
    this.selectedUnLoadingContractor=$event;
    //console.log(this.unLoadingContractor)
  }

  add(){
 
    let object={
      'UbtId':this.ubtidInput,
      "CategoryId":this.categoryidInput,
      "GoodsType":this.goodstypeInput,
      'TransporterId':this.selectedTransporter,
      'TranAmount':this.transporterRate,
      'LoadContId':this.selectedLoadingContractor,
      'LoadContAmount':this.loadingRate,
      'UnloadContId':this.selectedUnLoadingContractor,
      'UnloadContAmount':this.unloadingRate,
   }
 console.log(object);
 this.addedSeekProposalDetails.push(object);
 this.allSeekProposalDetails.push(object);
//  console.log(this.allSeekProposalDetails);
 this.selectedTransporter="";
 this.transporterRate="";
 this.selectedLoadingContractor="";
 this.loadingRate="";
 this.selectedUnLoadingContractor="";
 this.unloadingRate="";
  }
  saveProposal(){
    //console.log(this.allSeekProposalDetails);
    this.proposalService.addProposal(this.allSeekProposalDetails).subscribe((data:any)=>{
      console.log(data);
    })
    this.allSeekProposalDetails = [];
    this.addedSeekProposalDetails=[];
  }
  delete(items){
    let index = this.addedSeekProposalDetails.indexOf(items);
    this.addedSeekProposalDetails.splice(index,1);
  }

}
