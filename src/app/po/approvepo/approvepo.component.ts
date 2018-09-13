import { Component, OnInit } from '@angular/core';
import {PoService} from '../po.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-approvepo',
  templateUrl: './approvepo.component.html',
  styleUrls: ['./approvepo.component.css']
})
export class ApprovepoComponent implements OnInit {
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
  inputPoId:any;
 ///
 currentPoId:any;
 currentPOStatus:any;
 approvePodetails:any=[];
 ubtdetailsByPoId:any={};


  ProposalId:any;
    //step 2 for Tree struture
    nodes:any=[];
    options: ITreeOptions = {
      displayField: 'Name',
      isExpandedField: 'expanded',
      idField: 'Id',
      hasChildrenField: 'nodes',
      
    }
  constructor(private poservice: PoService,private alertService :AlertService) {
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
    let obj ={
      'POId': $event.node.data.Id,
      
    }
    console.log(obj);
    this.inputPoId=$event.node.data.Id
    this.poservice.getApprovePoDeatils(obj).subscribe((data:any)=>{
     // console.log(data);
     this.currentPoId=data.POData[0].POId;
     this.currentPOStatus=data.POData[0].POStatus;
     console.log(this.currentPOStatus);
     console.log(this.currentPoId);
      this.approvePodetails=data.POData;
      this.ubtdetailsByPoId=data.ubt;
    })
    
      }
    
      approveAndSend(){
        let obj={"ObjectType":'PO',
        "Id":this.currentPoId,
        "Status":'Approved'
      }
      //console.log(obj);
        this.poservice.approveAndSendDetails(obj).subscribe((data:any)=>{
          console.log(data);
          if(data !== 'null'){

            this.alertService.alert(AlertType.Success,"Approve Successfuly with POID as :"+ this.currentPoId)
          /// ToRefershing the data
            let obj ={
              'POId':this.inputPoId,
              
            }
            console.log(obj);
         
            this.poservice.getApprovePoDeatils(obj).subscribe((data:any)=>{
             // console.log(data);
             this.currentPoId=data.POData[0].POId;
             this.currentPOStatus=data.POData[0].POStatus;
             console.log(this.currentPOStatus);
             console.log(this.currentPoId);
              this.approvePodetails=data.POData;
              this.ubtdetailsByPoId=data.ubt;
            })
          ////Ended refreshing the data
          }
          else{
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
