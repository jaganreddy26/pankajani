import { Component, OnInit,TemplateRef } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { element } from 'protractor';
@Component({
  selector: 'app-amendproposal',
  templateUrl: './amendproposal.component.html',
  styleUrls: ['./amendproposal.component.css']
})
export class AmendproposalComponent implements OnInit {
  customer: any = []
  Id: any;
  value:any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  status:any=[];
  StatusName:any;
  ProposalsDetailsByID:any=[];
  UbtId:any;
  CategoryId:any;
  GoodsType:any;
  CategoryName:any;
  ProposalIdStatic:any;
///Adding new Proposal to proposalID
transporter:any=[];
loadingContractor:any=[];
unloadingContractor:any[];
selectedTransporter:any;
 transporterRate:any;
 selectedLoadingContractor:any;
 loadingRate:any;
 selectedUnLoadingContractor:any;
 unloadingRate:any;
 addedNewProposalsToProposalId:any=[];
 inputProposalId:any;
 LoadingPoint:any;
 UnLoadingPoint:any;
//To edit the proposal details for Input parameters
transporterId:any
loadContId:any;
unloadContId:any
editProposalDetails:any= {};
//delete the indvidule proposal Objct
deletInputObj:any={};
   //step 2 for Tree struture
  nodes:any=[];
  options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
  modalRef: BsModalRef;
  constructor(private proposalService: ProposalServiceService,
    private alertService :AlertService,private modalService: BsModalService) { 
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
        element.TCategory.forEach(element => {
         // parent.push(element)
         element.children.forEach(element =>{
           parent.push(element)
         })
        });
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
  onActivate($event){
  
    // objectTypeTransport type Input Object
    let objectTypeTransport = {
      ObjectType: 'Transporter' 
    };
  // objectTypeLoading type Input Object
    let objectTypeLoading = {
      ObjectType: 'Loading Contractor' 
    };
  // objectTypeUnloading type Input Object
   let objectTypeUnloading = {
      ObjectType: 'Unloading Contractor' 
    };

     this.proposalService.getVendor(objectTypeTransport).subscribe((data:any)=>{
       this.transporter=data;
     });

     this.proposalService.getVendor(objectTypeLoading).subscribe((data:any)=>{
      this.loadingContractor=data;
    });
 

    this.proposalService.getVendor(objectTypeUnloading).subscribe((data:any)=>{
     this.unloadingContractor=data;
    });
  
this.ProposalIdStatic=$event.node.data.Id;
//here Getting the created seek proposal Details based On ProposalId
let obj ={
  'ProposalId': $event.node.data.Id,
}
this.inputProposalId=$event.node.data.Id
this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
  this.ProposalsDetailsByID=data;
  //below recods are for displaying as satatic data
  this.UbtId=data[0].UbtId,
  this.CategoryId=data[0].CategoryId,
  this.GoodsType=data[0].GoodsType
  this.CategoryName=data[0].CategoryName
  })
}
add(){
  let object={
    "ProposalId":this.ProposalIdStatic,
    'TransporterId':this.selectedTransporter,
    'TranAmount':this.transporterRate,
    'LoadContId':this.selectedLoadingContractor,
    'LoadContAmount':this.loadingRate,
    'UnloadContId':this.selectedUnLoadingContractor,
    'UnloadContAmount':this.unloadingRate,
  }
  console.log(object);
  this.addedNewProposalsToProposalId.push(object);
  this.selectedTransporter="";
 this.transporterRate="";
 this.selectedLoadingContractor="";
 this.loadingRate="";
 this.selectedUnLoadingContractor="";
 this.unloadingRate="";
}
delete(items){
  let index = this.addedNewProposalsToProposalId.indexOf(items);
  this.addedNewProposalsToProposalId.splice(index,1);
}
saveNewProposal(){
  let Inputarray:any=[];
  this.addedNewProposalsToProposalId.forEach(element=>{
    Inputarray.push({
      "UbtId":this.UbtId,
      "CategoryId":this.CategoryId,
      "GoodsType":this.GoodsType,
      "LoadingPoint":this.LoadingPoint,
      "UnloadingPoint":this.UnLoadingPoint,
      "TransporterId":element.TransporterId,
      "TranAmount":element.TranAmount,
      "LoadContId":element.LoadContId,
      "LoadContAmount":element.LoadContAmount,
      "UnloadContId":element.UnloadContId,
      "UnloadContAmount":element.UnloadContAmount,
      "ProposalId":this.ProposalIdStatic
    })
  })
  console.log(Inputarray);
this.proposalService.addProposalByProposalId(this.addedNewProposalsToProposalId).subscribe((data:any)=>{
  console.log(data);
  if(data=='Success'){
    this.alertService.alert(AlertType.Success,"New Proposal is Added for this ProposalId :"+" "+this.ProposalIdStatic )
    }else{
      this.alertService.alert(AlertType.Error,"Something went wrong");
    }
})
let obj ={
  'ProposalId': this.inputProposalId
}

this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
  this.ProposalsDetailsByID=data;
  //below recods are for displaying as satatic data
  this.UbtId=data[0].UbtId,
  this.CategoryId=data[0].CategoryId,
  this.GoodsType=data[0].GoodsType,
  this.CategoryName=data[0].CategoryName
  })
this.addedNewProposalsToProposalId=[];
this.LoadingPoint="";
this.UnLoadingPoint="";
}
openModal(items,template1: TemplateRef<any>){

  this.transporterId=items.TransporterId;
this.loadContId=items.LoadingContId;
 this.unloadContId=items.UnloadingContId;
 this.modalRef = this.modalService.show(template1);

 this.getDetailsForEdit();
}

getDetailsForEdit(){
  let object={
    "ProposalId":this.ProposalIdStatic,
    "TransporterId":this.transporterId,
    "LoadContId":this.loadContId,
    "UnloadContId":this.unloadContId,
    
   }


   this.proposalService.getProposalDetailsForEdit(object).subscribe((data:any)=>{
     console.log(data);
this.editProposalDetails=data[0];
   })
}

updateRecord(){
  let obj={
    "ProposalId": this.ProposalIdStatic,
"TransporterId":this.editProposalDetails.TransporterId,
"TranAmount": this.editProposalDetails.TranAmount,
"LoadContId": this.editProposalDetails.LoadContId,
"LoadContAmount": this.editProposalDetails.LoadContAmount,
"UnloadContId": this.editProposalDetails.UnloadContId,
"UnloadContAmount": this.editProposalDetails.UnloadContAmount
  }
  console.log(obj);
  this.proposalService.updateIndividualProposalDetails(obj).subscribe((data:any)=>{
    console.log(data);
    if(data=='Success'){
      this.alertService.alert(AlertType.Success,"Successfuly Updated the Record Details ")
      }else{
        this.alertService.alert(AlertType.Error,"Failed the Updated Record Details ");
      }
  })
  // this.editProposalDetails="";
  this.modalRef.hide();
  let objId ={
    'ProposalId': this.ProposalIdStatic
  }
  this.proposalService.getProposalsDetailsByProposalId(objId).subscribe((data:any)=>{
    this.ProposalsDetailsByID=data;
  console.log('method called');
    })
  
}
deleteProposal(items,template2){
  this.modalRef = this.modalService.show(template2);
  let obj={
  
"ProposalId":this.ProposalIdStatic,
"TransporterId":items.TransporterId,
"LoadContId":items.LoadingContId,
"UnloadContId":items.UnloadingContId,


  }
  console.log(obj)
this.deletInputObj=obj;
}
confirm(){
 // console.log(this.deletInputObj);
    this.proposalService.deleteIndividualProposal(this.deletInputObj).subscribe((data:any)=>{
      console.log(data);
    })
   
    this.deletInputObj="";
   // console.log(this.deletInputObj);
   let obj ={
    'ProposalId': this.ProposalIdStatic,
  }
  this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
    this.ProposalsDetailsByID=data;
    //below recods are for displaying as satatic data
    // this.UbtId=data[0].UbtId,
    // this.CategoryId=data[0].CategoryId,
    // this.CategoryName=data[0].CategoryName
    })

    this.modalRef.hide();
}
decline(){
  this.modalRef.hide();
}

  // onchange($event) {
  //   this.Id = $event

  // }

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
  

}
