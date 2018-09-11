import { Component, OnInit } from '@angular/core';
import {PoService} from '../po.service';
@Component({
  selector: 'app-viewpo',
  templateUrl: './viewpo.component.html',
  styleUrls: ['./viewpo.component.css']
})
export class ViewpoComponent implements OnInit {
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
  //ViewPo details
  viewPoDetails:any=[];
  ubtdetailsByPoId:any={};
  constructor(private poService:PoService) {
    this.getCustomer();
   }

  ngOnInit() {
  }
  getCustomer() {
    this.poService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }

  
  search() {

    this.businessId = this.poService.BusinessId;
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
    this.poService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;

    })

  }
  onActivate($event){
   
  }
  // getDetailsbyPoId(){
  //   let object={
  //     "POId":6
  //   }
  //   this.poService.getPoDetailsByPoId(object).subscribe((data:any)=>{
   
  //     this.viewPoDetails=data.POData;
  //     this.ubtdetailsByPoId=data.ubt;
     
  //   })

  // }
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
