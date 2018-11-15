import { Component, OnInit } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-conformproposal',
  templateUrl: './conformproposal.component.html',
  styleUrls: ['./conformproposal.component.css']
})
export class ConformproposalComponent implements OnInit {
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
  inputProposalId:any;
  FilePath:any;
  ConfirmBiddingType:any;
  ProposalIdFolderPath:any;
////==========base64formatedata Varibles=========////
base64textString:any;
FileName:any;
FileType:any;
//////
  ProposalsDetailsByID:any=[];
  UbtId:any;
  CustomerName:any;
  GoodsType:any;
  ProposalId:any;
  ProposalIdStatus:any;
   //step 2 for Tree struture
   nodes:any=[];
   options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
  constructor(private proposalService: ProposalServiceService,private alertService :AlertService) { 
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
  handleFileSelect(evt){
    //console.log(evt);
    var File=evt.target.value;
   // console.log(File);
     let subStringData=File.substr(12,27);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType =subStringData.split('.')[1];
    //console.log(filename);
   // console.log(FileType);
   this.FileName=FileName;
   this.FileType=FileType;
   var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          // console.log(this.FileName);
          // console.log(this.FileType);
           //console.log(this.base64textString);
          
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
  onActivate($event){
    let obj ={
      'ProposalId': $event.node.data.Id,
    }
    this.inputProposalId=$event.node.data.Id,
    this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
     this.ProposalsDetailsByID=data;
    this.UbtId=data[0].UbtId;
    this.CustomerName=data[0].CustomerName;
    this.GoodsType=data[0].GoodsType;
    this.ProposalId=data[0].ProposalId;
    this.ProposalIdStatus=data[0].Status;
    this.ProposalIdFolderPath=data[0].FolderPath;
      })
      }

      saveDocumentPath(){

        let obj={
          "FilePath":this.ProposalIdFolderPath,
          "EncryptedFile":this.base64textString,
          "FileExtn":this.FileType,
          "UploadedFileName":this.FileName
        }

       let object={
        "CompanyId":localStorage.getItem('businessId'),
        "ProposalId":this.ProposalId,
        "FileDetails":obj
      }
      console.log(object);
       this.proposalService.conformProposal(object).subscribe((data:any)=>{
   console.log(data);
         if(data == 'Success'){

          this.alertService.alert(AlertType.Success,"Saved the filePath Successfuly")
        }else
        {
          this.alertService.alert(AlertType.Error,"Filepath Is Not Saved");
        }

        let obj ={
          'ProposalId':this.inputProposalId,
        }
        //this.inputProposalId=$event.node.data.Id,
        this.proposalService.getProposalsDetailsByProposalId(obj).subscribe((data:any)=>{
         this.ProposalsDetailsByID=data;
        this.UbtId=data[0].UbtId;
        this.CustomerName=data[0].CustomerName;
        this.GoodsType=data[0].GoodsType;
        this.ProposalId=data[0].ProposalId;
        this.ProposalIdStatus=data[0].Status;
        this.ProposalIdFolderPath=data[0].FolderPath;
          })
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
