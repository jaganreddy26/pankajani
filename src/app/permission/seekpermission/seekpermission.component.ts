import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { element } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'app-seekpermission',
  templateUrl: './seekpermission.component.html',
  styleUrls: ['./seekpermission.component.css']
})
export class SeekpermissionComponent implements OnInit {
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
   //step 2 for Tree struture
   nodes:any=[];
   //STEP2
 options: ITreeOptions = {
  displayField: 'Name',
  isExpandedField: 'expanded',
  idField: 'Id',
  hasChildrenField: 'nodes',
  
}
/////
ubtDetails:any={};
podata:any=[];
  constructor(private permissionService:PermissionService,private alertService :AlertService) { 
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.permissionService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }

  getCustomer() {
    this.permissionService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }
  search(){
    this.businessId = this.permissionService.BusinessId;
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
    this.permissionService.getUbtIds(object).subscribe((data: any) => {
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
          //  element.children.forEach(element=>{
          //    parent.push(element)
          //  })
           })
         })
        });
        });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;
    })
  }
  onActivate($event){
    //console.log($event.node.data.Id);
      let object={
      "POId":$event.node.data.Id
    }
  //  console.log(object);
  this.permissionService.getSeekPermissionDetailsByPoId(object).subscribe((data:any)=>{
  console.log(data);
   this.ubtDetails=data.Ubt;
   this.podata=data.POData;
  })
  }
  save(){
    let array:any=[];
    this.podata.forEach(element=>{
      array.push({
        'TransporterId':element.TransporterId,
        'TransporterAmount':element.TransporterAmount,
        'LoadingContId':element.LoadingContId,
        'LoadingContAmount':element.LoadingContAmount,
        'UnloadingContId':element.UnloadingContId,
        'UnloadingContAmount':element.UnloadingContAmount,
        'SuppliedQty':element.SuppliedQty,
        'SuppliedPrice':element.SuppliedPrice,
        'POId':element.POId
      })
    })
  console.log(array);
   this.permissionService.createPermissionByPoid(array).subscribe((data:any)=>{
     console.log(data);
     if(data !== 'null'){

      this.alertService.alert(AlertType.Success,"Permission Created Successfuly with Id As :"+ data)
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
