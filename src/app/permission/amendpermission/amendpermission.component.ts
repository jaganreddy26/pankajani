import { Component, OnInit,TemplateRef } from '@angular/core';
import { PermissionService } from '../permission.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { element } from 'protractor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-amendpermission',
  templateUrl: './amendpermission.component.html',
  styleUrls: ['./amendpermission.component.css']
})
export class AmendpermissionComponent implements OnInit {
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
  ///
     //step 2 for Tree struture
     nodes:any=[];
     //STEP2
   options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
    ////////////
    ubtDetails:any={}
    PermissionDetails:any=[];
    PoId:any;
    Permissionid:any;
    PermissionStatus:any;
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
 SuppliedQty:any;
 SuppliedPrice:any;
 newTransporterDetails:any=[];
 /////
 objectTypeTransport:any;
 objectTypeLoading:any;
 objectTypeUnloading:any;
 modalRef: BsModalRef;

 permissionId:any
 transporterId:any
 loadingconId:any;
 unloadingcontId:any

 InputDetails:any;
 //delete the indvidule Records Objct
deletInputObj:any={};
  constructor(private permissionService:PermissionService,
    private alertService :AlertService,private modalService: BsModalService) {
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
          // parent.push(element)
           element.children.forEach(element=>{
             parent.push(element)
           })
           })
         })
        });
        });
        this.nodes = parent;
    })
  }
  onActivate($event){

    

    let obj={
     'PermissionId':$event.node.data.Id,
     'CompanyId':this.permissionService.BusinessId
    }
    this.Permissionid=$event.node.data.Id;

    this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
      console.log(data);
      this.ubtDetails=data.ubt;
      this.PermissionDetails=data.PermissionData;
      this.PoId=data.PermissionData[0].POId;
      this.PermissionStatus=data.PermissionData[0].PermissionStatus;
      console.log(this.PoId);
        // objectTypeTransport type Input Object
        this.objectTypeTransport = {
          "POId":this.PoId,
          "BusinessAreaId":localStorage.getItem('TransporterID')
        };
        //console.log(this.objectTypeTransport)
        this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(this.objectTypeTransport).subscribe((data:any)=>{
          this.transporter=data;
        });
      // objectTypeLoading type Input Object
        this.objectTypeLoading = {
          "POId":this.PoId,
          "BusinessAreaId":localStorage.getItem('loadingTransporter')
        };
        //console.log(this.objectTypeLoading)
              this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(this.objectTypeLoading).subscribe((data:any)=>{
        this.loadingContractor=data;
      });
      // objectTypeUnloading type Input Object
       this.objectTypeUnloading = {
        "POId":this.PoId,
        "BusinessAreaId":localStorage.getItem('UnloadingTransporter')
        };
          this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(this.objectTypeUnloading).subscribe((data:any)=>{
        this.unloadingContractor=data;
      });
        //console.log(this.objectTypeUnloading)
    })

    
  
      //  this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(this.objectTypeTransport).subscribe((data:any)=>{
      //    this.transporter=data;
      //  });
  
      //  this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(objectTypeLoading).subscribe((data:any)=>{
      //   this.loadingContractor=data;
      // });
   
  
      // this.permissionService.getTransporterLoadingContractorUnLoadingContractorDetails(objectTypeUnloading).subscribe((data:any)=>{
      //  this.unloadingContractor=data;
      // });
    // console.log('hi');
   // console.log($event.node.data.Id);

   }
   add(){
    let object={
      "CompanyId":this.permissionService.BusinessId,
      'PermissionId':this.Permissionid,
      'TransporterId':this.selectedTransporter,
      'TransporterAmount':this.transporterRate,
      'LoadingContId':this.selectedLoadingContractor,
      'LoadingContAmount':this.loadingRate,
      'UnloadingContId':this.selectedUnLoadingContractor,
      'UnloadingContAmount':this.unloadingRate,
      'SuppliedQty':this.SuppliedQty,
      'SuppliedPrice':this.SuppliedPrice,
      'POId':this.PoId,

    }
    console.log(object);
    this.newTransporterDetails.push(object);
    this.selectedTransporter="";
    this.transporterRate="";
    this.selectedLoadingContractor="";
    this.loadingRate="";
    this.selectedUnLoadingContractor="";
    this.unloadingRate="";
    this.SuppliedQty="";
    this.SuppliedPrice="";
     console.log(this.newTransporterDetails);
   }
   delete(items){
    let index = this.newTransporterDetails.indexOf(items);
    this.newTransporterDetails.splice(index,1);
   }
   saveNewRecords(){
     console.log(this.newTransporterDetails);
    // this.newTransporterDetails="";

    this.permissionService.addNewTransporterDetailsToPermissionId(this.newTransporterDetails).subscribe((data:any)=>{
      console.log(data);
      if(data=='Success'){
        this.alertService.alert(AlertType.Success,"New Transporter Details is Added for this PermissionId :"+" "+ this.Permissionid )
        }else{
          this.alertService.alert(AlertType.Error,"Something went wrong");
        }
        this.newTransporterDetails=[];
        ///Refresh the Data After Adding new Transporter to Permissiob Id
        let obj={
          'PermissionId':this.Permissionid,
          'CompanyId':this.permissionService.BusinessId
         }
         this.Permissionid=this.Permissionid;
     
         this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
           console.log(data);
           this.ubtDetails=data.ubt;
           this.PermissionDetails=data.PermissionData;
           this.PoId=data.PermissionData[0].POId;
           this.PermissionStatus=data.PermissionData[0].PermissionStatus;
           console.log(this.PoId);
         })
    })
   
   }
   openModalForEdit(items,template: TemplateRef<any>) {
    
 
      this.permissionId=this.Permissionid,
      this.transporterId=items.TransporterId,
      this.loadingconId=items.LoadingContId,
      this.unloadingcontId=items.UnloadingContId
    
     // this.InputDetails=object;
    this.getInputObject();
  
    this.modalRef = this.modalService.show(template);

  }
 

  getInputObject(){
    let obj={
      "CompanyId":this.permissionService.BusinessId,
      "PermissionId":this.permissionId,
      "TransporterId":this.transporterId,
      "LoadingContId":this.loadingconId,
      "UnloadingContId": this.unloadingcontId,
   
      }
      this.InputDetails=obj;
      
  }
  deleteRecords(items,template2){
    this.modalRef = this.modalService.show(template2);
    let obj={
        "CompanyId":this.permissionService.BusinessId,
        "PermissionId":this.Permissionid,
        "TransporterId":items.TransporterId,
        "LoadingContId":items.LoadingContId,
        "UnloadingContId":items.UnloadingContId
    }
    console.log(obj)
  this.deletInputObj=obj;
  }
  confirm(){
    // console.log(this.deletInputObj);
       this.permissionService.deleteIndividualRecords(this.deletInputObj).subscribe((data:any)=>{
         console.log(data);
         if(data=='Success'){
          this.alertService.alert(AlertType.Success,"Record Deleted Sucessfully" )
          }else{
            this.alertService.alert(AlertType.Error,"Something went wrong");
          }
       })
      
       this.modalRef.hide();
       let obj={
        'PermissionId':this.Permissionid,
        'CompanyId':this.permissionService.BusinessId
       }
      // this.Permissionid=this.Permissionid;
   
       this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
         console.log(data);
         this.ubtDetails=data.ubt;
         this.PermissionDetails=data.PermissionData;
         this.PoId=data.PermissionData[0].POId;
         this.PermissionStatus=data.PermissionData[0].PermissionStatus;
         console.log(this.PoId);
       })
   }
   decline(){
     this.modalRef.hide();
   }

   onHide()
   {
     this.modalRef.hide();
     let obj={
      'PermissionId':this.Permissionid,
          'CompanyId':this.permissionService.BusinessId
     }
    // this.Permissionid=this.Permissionid;
 
     this.permissionService.getPermissionDetailsByPermissionId(obj).subscribe((data:any)=>{
       console.log(data);
       this.ubtDetails=data.ubt;
       this.PermissionDetails=data.PermissionData;
       this.PoId=data.PermissionData[0].POId;
       this.PermissionStatus=data.PermissionData[0].PermissionStatus;
       console.log(this.PoId);
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
