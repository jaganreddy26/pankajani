import { Component, OnInit } from '@angular/core';
import {OfferService} from '../offer.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.css']
})
export class CreateofferComponent implements OnInit {
  poIds:any=[];
  SelectedPOId:any;
  vendorType:any=[];
  SelectedVendorType:any;
  vendorName:any=[];
  SelectedVendorName:any;
  Rate:any;
  PermitNo:any;
  addedCreateOfferDetails:any=[];
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
      this.poIds=data;
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
      "POId":this.SelectedPOId,
      "CompanyId":localStorage.getItem('businessId'),
      "BusinessAreaId":this.SelectedVendorType
    }
    console.log(object);
    this.offerService.getVendorNameforCreateOffer(object).subscribe((data:any)=>{
      //console.log(data);
      this.vendorName=data;
    })
  }
  add(){
    let object={
      'PoId':this.SelectedPOId,
      'VendorType':this.SelectedVendorType,
      'VendorName':this.SelectedVendorName,
      'Rate':this.Rate,
      'PermitNo':this.PermitNo
    }
    console.log(object);
    this.addedCreateOfferDetails.push(object);
    this.SelectedPOId="";
    this.SelectedVendorType="";
    this.SelectedVendorName="";
    this.Rate="";
    this.PermitNo="";
  }
  delete(items){
    let index = this.addedCreateOfferDetails.indexOf(items);
    this.addedCreateOfferDetails.splice(index,1);
  }

  save(){      
    let InputArray:any=[];
    this.addedCreateOfferDetails.forEach(element => {
      InputArray.push({
        "Offer":{"POId":element.PoId,"VendorId":element.VendorName},"Rate":element.Rate,"PermitNo":element.PermitNo,"CompanyId":localStorage.getItem('businessId')
      })
      
    });
    //console.log(InputArray);
     this.offerService.saveCreateOffer(InputArray).subscribe((data:any)=>{
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
    this.addedCreateOfferDetails=[];
  }

  onchangePOId($event){
    this.SelectedPOId=$event
  //  console.log(this.SelectedPOId);
  this.GetVendorName();
  }
  onchangeVendorType($event){
  this.SelectedVendorType=$event
 // console.log(this.SelectedVendorType);
 this.GetVendorName();
  }
  onchangeVendorName($event){
    this.SelectedVendorName=$event;
  }

}
