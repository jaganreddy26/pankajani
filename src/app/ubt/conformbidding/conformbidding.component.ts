import { Component, OnInit } from '@angular/core';
import { UbtService } from '../ubt.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-conformbidding',
  templateUrl: './conformbidding.component.html',
  styleUrls: ['./conformbidding.component.css']
})
export class ConformbiddingComponent implements OnInit {

  customer: any = []
  FromDate: any = new Date();
  ToDate: any = new Date();
  Id: any;
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  amendUbtIds: any = [];
  value: any;
  editDetails: boolean = false;
  udtData: any = [];
  ids: any = [];
  goodsTypeSelected: any;
  goodsType: any = [];
  CategoryNameList: any = [];
  agency:any=[];
  agencyIdSelected:any;
  customerIdSelected:any;
  confirmBiddingStatus: string;
  categoryIdSelected:any;
  Quantity:any;
  BasePrice:any;
  MaxMargin:any;
  status:any=[];
  StatusName:any;
  nodes:any=[];
  options: ITreeOptions = {
    displayField: 'CategoryName',
    isExpandedField: 'expanded',
    idField: 'CategoryId',
    hasChildrenField: 'nodes',
    
  }
  constructor(private ubtService: UbtService) {
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.ubtService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  getCustomer() {
    this.ubtService.getCustomerName().subscribe((data: any) => {
      console.log(data);
      this.customer = data;
    })
  }
  search() {
    this.businessId = this.ubtService.BusinessId;
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

    }
    this.ubtService.getViewUbtDetails(object).subscribe((data: any) => {
      this.ids = data;
      let all:any=[]
      let parent:any=[]
      let children:any=[];
      console.log(this.ids)
      this.ids.forEach(element => {
        parent.push({'CategoryId':element.UbtId,'CategoryName':element.UbtId,'children':element.TCategory})
      });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;

      // this.nodes.prototy
      console.log(this.nodes)

    })

  }

  edit(item) {
    console.log(item)
    this.editDetails = true;
    this.udtData = [];

    this.ubtService.GetIndividualUbtDetails(item).subscribe((data: any) => {
      // this.udtData = data;
      data.forEach(element => {
        this.udtData.push({ 'GoodsType': element.GoodsType, 'CategoryId': element.CategoryId,'CategoryName': element.CategoryName, 'Quantity': element.Quantity, 'BasePrice':element.BasePrice, 'MaxMargin':element.MaxMargin});
        this.agencyIdSelected = element.AgencyId;
        this.customerIdSelected = element.CustomerName;
        this.confirmBiddingStatus = element.ConfirmBidding;
      }); 
    })
  }
  onchange($event) {
    this.Id = $event;
    this.getAgencyName($event);
    this.getGoodsTypeList($event);
    this.getCategoryNameList($event);
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

  onchangeGoodsType($event) {

  }
  getGoodsTypeList(id) {
    this.ubtService.getGoodsType(id).subscribe((data: any) => {
      // console.log(data);
      this.goodsType = data;
    })
  }
  getCategoryNameList(id) {
    this.ubtService.getCategoryName(id).subscribe((data: any) => {
      // console.log(data);
      this.CategoryNameList = data;
    })
  }
  getAgencyName(id){
    this.ubtService.getAgency(id).subscribe((data:any)=>{
 //console.log(data);
     this.agency=data;
    })
  }
  onchangeCategoryName($event){

  }
  add(){
    let object={
      'GoodsType':this.goodsTypeSelected,
      'CategoryName':this.categoryIdSelected,
      'Quantity':this.Quantity,
      'BasePrice':this.BasePrice,
      'MaxMargin':this.MaxMargin
   }

   this.udtData.push(object);
   this.goodsTypeSelected ="";
   this.categoryIdSelected ="";
   this.Quantity ="";
   this.BasePrice ="";
   this.MaxMargin ="";

  }
  delete(items){

  }
  updateUbt(){

  }
  onActivate($event){   
    if($event.node.data.children){

    }
    else{
      this.editDetails = true;
      let ubtId = { 'UbtId': $event.node.data.UbtId }
          this.ubtService.getIndividualUbt(ubtId).subscribe((data: any) => {
           this.udtData = data;
           console.log(this.udtData)
          })

        }
}
}
