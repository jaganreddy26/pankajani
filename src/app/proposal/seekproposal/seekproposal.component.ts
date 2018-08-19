import { Component, OnInit } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';

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
//step 2 for Tree struture
   nodes:any=[];
//details about seek from tree structure
  seekProposalsDetails:any;
  transporter:any=[];
  loadingContractor:any=[];
  unloadingContractor:any[];
 //adding the seekProposal details;
 selectedTransporter:any;
 transporterRate:any;
 selectedLoadingContractor:any;
 loadingRate:any;
 selectedUnLoadingContractor:any;
 unloadingRate:any;
 addedSeekProposalDetails:any=[];
 
  options = {};
  constructor(private proposalService: ProposalServiceService) {
    this.getCustomer();
   
   }

 
  ngOnInit() {
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

       //step 3 for Tree struture
      let all:any=[]
      this.ids.forEach(element => {
        element.TCategory.forEach(element2 => {
          let children:any=[];
          children.push({'id':element2.CategoryId,'name':element2.CategoryName,'GoodsTypes':element2.GoodsTypes,'UbtId':element2.UbtId})
          all.push({'id':element.UbtId,'name':element.UbtId,'children':children})
        });        
      
      });
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = all;

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
        'CategoryId': $event.node.data.id,
        'GoodsType':$event.node.data.GoodsTypes,
        'Status': 'Open',
        UbtId:$event.node.data.UbtId,

      }
     // console.log(obj);
     this.proposalService.getSeekProposals(obj).subscribe((data:any)=>{
      //  console.log(data);
       this.seekProposalsDetails=data[0];
      // console.log(this.seekProposalsDetails)
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
      // console.log(data);
       this.transporter=data;
     });

     this.proposalService.getVendor(objectTypeLoading).subscribe((data:any)=>{
     // console.log(data);
      this.loadingContractor=data;
    });

    this.proposalService.getVendor(objectTypeUnloading).subscribe((data:any)=>{
     // console.log(data);
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
      'Transporter':this.selectedTransporter,
      'TransporterRate':this.transporterRate,
      'LoadingContractor':this.selectedLoadingContractor,
      'LoadingRate':this.loadingRate,
      'UnloadingContractor':this.selectedUnLoadingContractor,
      'UnloadingRate':this.unloadingRate,
   }
 //console.log(object);
 this.addedSeekProposalDetails.push(object);
 this.selectedTransporter="";
 this.transporterRate="";
 this.selectedLoadingContractor="";
 this.loadingRate="";
 this.selectedUnLoadingContractor="";
 this.unloadingRate="";
  }
  delete(items){
    let index = this.addedSeekProposalDetails.indexOf(items);
    this.addedSeekProposalDetails.splice(index,1);
  }
}
