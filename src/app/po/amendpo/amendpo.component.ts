import { Component, OnInit,TemplateRef } from '@angular/core';
import {PoService} from '../po.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-amendpo',
  templateUrl: './amendpo.component.html',
  styleUrls: ['./amendpo.component.css']
})
export class AmendpoComponent implements OnInit {
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
  CategoryName
  // Amend details
  checkingPoId:any;
  amendPodetails:any=[];
  ubtdetailsByPoId:any={};
    //step 2 for Tree struture
    nodes:any=[];
    //STEP2
  options: ITreeOptions = {
   displayField: 'Name',
   isExpandedField: 'expanded',
   idField: 'Id',
   hasChildrenField: 'nodes',
   
 }
  modalRef: BsModalRef;
  constructor(private poservice: PoService,
    private alertService :AlertService,private modalService: BsModalService) { 
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.poservice.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
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
      this.toDateChanged =true;
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
  console.log($event.node.data.Id);

      let object={
      "POId":$event.node.data.Id
    }
    this.poservice.getAmendPoDetails(object).subscribe((data:any)=>{
      console.log(data);
       console.log(data);
    this.checkingPoId=data.POData[0].POId;
   console.log(this.checkingPoId);
    this.amendPodetails=data.POData;
    this.ubtdetailsByPoId=data.ubt;
    
    })
    // this.poservice.getAmendPoDetails(object).subscribe((data:any)=>{
    
    // })
  }

  save(){
    //console.log(this.amendPodetails);
      let array:any=[];
      this.amendPodetails.forEach(element => {
        array.push({'ProposalId':this.ubtdetailsByPoId.ProposalId,'TransporterId':element.TransporterId,'TransporterAmount':element.TransporterAmount,'LoadingContId':element.LoadingContId,
      'LoadingContAmount':element.LoadingContAmount,'UnloadingContId':element.UnloadingContId,'UnloadingContAmount':element.UnloadingContAmount,'SuppliedQty':element.SuppliedQty,
    'SuppliedPrice':element.SuppliedPrice,'POId':element.POId})
      });
      console.log(array)
    this.poservice.updateandSaveamendPoDetails(array).subscribe((data:any)=>{
     // console.log(data);
     if(data !== 'null'){

      this.alertService.alert(AlertType.Success,"Updated Successfully ")
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
