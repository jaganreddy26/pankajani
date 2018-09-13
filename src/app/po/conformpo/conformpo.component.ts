import { Component, OnInit } from "@angular/core";
import { PoService } from "../po.service";
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import {
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  ITreeOptions
} from "angular-tree-component";
@Component({
  selector: "app-conformpo",
  templateUrl: "./conformpo.component.html",
  styleUrls: ["./conformpo.component.css"]
})
export class ConformpoComponent implements OnInit {
  customer: any = [];
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  status: any = [];
  StatusName: any;
  value: any;
  InputpoId:any;
   ///
 currentPoId:any;
 currentPOStatus:any;
 currentPoType:any;
 conformPodetails:any=[];
 ubtdetailsByPoId:any={};
 conformPoStatus:any = ["Dummy", "Real"];
 type:any;
  //step 2 for Tree struture
  nodes: any = [];
  options: ITreeOptions = {
    displayField: "Name",
    isExpandedField: "expanded",
    idField: "Id",
    hasChildrenField: "nodes"
  };
  constructor(private poservice: PoService,private alertService :AlertService) {
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: "UBT"
    };
    this.poservice.GetStatus(object).subscribe((data: any) => {
      this.status = data;
    });
  }
  getCustomer() {
    this.poservice.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    });
  }

  search() {
    this.businessId = this.poservice.BusinessId;
    this.customerId = this.Id;
    //console.log(this.customerId);
    if (this.fromDateChanged == false) {
      this.FromDate.toLocaleDateString();
      var fromdate =
        this.FromDate.getFullYear() +
        "-" +
        (this.FromDate.getMonth() + 1) +
        "-" +
        this.FromDate.getDate();
      this.FromDate = fromdate;
      this.fromDateChanged = true;
    }
    if (this.toDateChanged == false) {
      this.ToDate.toLocaleDateString();
      var todate =
        this.ToDate.getFullYear() +
        "-" +
        (this.ToDate.getMonth() + 1) +
        "-" +
        this.ToDate.getDate();
      this.ToDate = todate;
      this.toDateChanged = true;
    }
    let object = {
      BusinessId: this.businessId,
      CustomerId: this.customerId,
      FromDate: this.FromDate,
      ToDate: this.ToDate
    };
    this.poservice.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
      console.log(this.ids);
      let all: any = [];
      let parent: any = [];
      let children: any = [];
      //step 3 for Tree struture
      this.ids.forEach(element => {
        element.TCategory.forEach(element => {
          // parent.push(element)
          element.children.forEach(element => {
           // parent.push(element);
            element.children.forEach(element => {
               parent.push(element)
            });
          });
        });
      });

      //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;
      console.log(this.nodes);
    });
  }
  onActivate($event) {
   // console.log("hi");
    let obj ={
      'POId': $event.node.data.Id,
    }
    console.log(obj);
    this.InputpoId=$event.node.data.Id;
    this.poservice.getconformPoDetails(obj).subscribe((data:any)=>{
     // console.log(data);
     this.currentPoId=data.POData[0].POId;
     this.currentPOStatus=data.POData[0].POStatus;
     this.currentPoType=data.POData[0].POType;
    //  console.log(this.currentPOStatus);
    //  console.log(this.currentPoId);
     console.log(this.currentPoType);
      this.conformPodetails=data.POData;
      this.ubtdetailsByPoId=data.ubt;
    })
  }
  

  conforPo(){
    let obj={
      "POId":this.currentPoId,
      "Type":this.type
    }
    //console.log(obj);
    this.poservice.confirmPurchaseOrder(obj).subscribe((data:any)=>{
      console.log(data);
      if(data !== 'null'){

        this.alertService.alert(AlertType.Success,"Confirmed the PurchaseOrder to this POId :"+ this.currentPoId)
         /// ToRefershing the data
        let obj ={
          'POId':  this.InputpoId
        }
        console.log(obj);
        this.poservice.getconformPoDetails(obj).subscribe((data:any)=>{
         // console.log(data);
         this.currentPoId=data.POData[0].POId;
         this.currentPOStatus=data.POData[0].POStatus;
         this.currentPoType=data.POData[0].POType;
        
         console.log(this.currentPoType);
          this.conformPodetails=data.POData;
          this.ubtdetailsByPoId=data.ubt;
        })
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
      }
    })
  }
  conformType($event){
    //console.log($event);
    this.type=$event;
  }
  onchange($event) {
    this.Id = $event;
  }
  fromDateChange() {
    this.fromDateChanged = true;
    this.FromDate.toLocaleDateString();
    var fromdate =
      this.FromDate.getFullYear() +
      "-" +
      (this.FromDate.getMonth() + 1) +
      "-" +
      this.FromDate.getDate();
    this.FromDate = fromdate;
  }
  toDateChange() {
    this.toDateChanged = true;
    this.ToDate.toLocaleDateString();
    var todate =
      this.ToDate.getFullYear() +
      "-" +
      (this.ToDate.getMonth() + 1) +
      "-" +
      this.ToDate.getDate();
    this.ToDate = todate;
  }
}
