import { Component, OnInit } from '@angular/core';
import {OfferService} from '../offer.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-seekoffer',
  templateUrl: './seekoffer.component.html',
  styleUrls: ['./seekoffer.component.css']
})
export class SeekofferComponent implements OnInit {
poIds:any=[];
SelectedPOId:any;
vendorType:any=[];
SelectedVendorType:any;
vendorName:any=[];
SelectedVendorName:any;
seekType:any=["Email","Mobile"];
SelectedSeekType:any;

addedSeekDetails:any=[]
  constructor(private offerService:OfferService,private alertService :AlertService) { 
  this.GetPoIds();
  this.GetVendorType();
  }

  ngOnInit() {
  }

  GetPoIds(){
    let object={
      "CompanyId":localStorage.getItem('businessId')
    }
    this.offerService.getPoId(object).subscribe((data:any)=>{
     // console.log(data);
      this.poIds=data;data
    })
  }
  GetVendorType(){
    let object={
      "CompanyId":localStorage.getItem('businessId')
    }
    this.offerService.getVendorType(object).subscribe((data:any)=>{
    //  console.log(data);
      this.vendorType=data;
    })
  }

GetVendorName(){
  let object={
    "CompanyId":localStorage.getItem('businessId'),
    "BusinessAreaId":this.SelectedVendorType
  }
  console.log(object);
  this.offerService.getVendorName(object).subscribe((data:any)=>{
   // console.log(data);
    this.vendorName=data;
  })
}

add(){
  let object={
    'PoId':this.SelectedPOId,
    'VendorType':this.SelectedVendorType,
    'VendorName':this.SelectedVendorName,
    'SeekType':this.SelectedSeekType
  }
  //console.log(object);
this.addedSeekDetails.push(object);
  this.SelectedPOId="";
  this.SelectedVendorType="";
  this.SelectedVendorName="";
  this.SelectedSeekType="";
}
delete(items){
  let index = this.addedSeekDetails.indexOf(items);
  this.addedSeekDetails.splice(index,1);
}
save(){
  let inputArray:any=[];
  this.addedSeekDetails.forEach(element => {
    inputArray.push({
      "Offer":{"POId":element.PoId,"VendorId":element.VendorName},"SeekType":element.SeekType,"CompanyId":localStorage.getItem('businessId')
    })
  });
 // console.log(inputArray);
 this.offerService.saveSeekOfferDetails(inputArray).subscribe((data:any)=>{
   console.log(data);
   if(data=='Success'){
    this.alertService.alert(AlertType.Success,"Record Added Successfully" )
    }
    else if(data=='ERROR')
    {
      this.alertService.alert(AlertType.Error,"Records Addding is Failed");
    }
    else
    {
      this.alertService.alert(AlertType.Error,"Recrods are Duplicated");
    }
 
 })
 this.addedSeekDetails=[];
    
}

  onchangePOId($event){
    this.SelectedPOId=$event
  //  console.log(this.SelectedPOId);
  }
  onchangeVendorType($event){
  this.SelectedVendorType=$event
  console.log(this.SelectedVendorType);
 this.GetVendorName();
  }
  onchangeVendorName($event){
    this.SelectedVendorName=$event;
  //  console.log(this.SelectedVendorName);
  }
  onchangeSeekType($event){
    this.SelectedSeekType=$event;
  //  console.log(this.SelectedSeekType);
  }

}
