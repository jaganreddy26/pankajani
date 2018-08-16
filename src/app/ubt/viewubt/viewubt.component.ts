import { Component, OnInit } from '@angular/core';
import {UbtService} from '../ubt.service'
@Component({
  selector: 'app-viewubt',
  templateUrl: './viewubt.component.html',
  styleUrls: ['./viewubt.component.css']
})
export class ViewubtComponent implements OnInit {
  customer:any=[]
  Id:any;
  FromDate:any = new Date();
  ToDate:any = new Date();
  businessId:any;
  customerId:any;
  ids:any=[];
  utbid:any;
  constructor(private ubtService:UbtService ) {
    this.getCustomer();
   }

  ngOnInit() {
  }
  getCustomer(){
    this.ubtService.getCustomerName().subscribe((data:any)=>{
   /// console.log(data);
      this.customer=data;
    })
  }
  search(){
    this.businessId=this.ubtService.BusinessId,
    this.customerId=this.Id,
    //console.log(this.customerId);
    this.FromDate.toLocaleDateString();
    var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
    //console.log(fromdate)
    this.FromDate = fromdate;

    this.ToDate.toLocaleDateString();
    var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
   // console.log(todate)
    this.ToDate = todate;

    let object = {
      'BusinessId':this.businessId,
      'CustomerId':this.customerId,
      'FromDate':this.FromDate,
      'ToDate':this.ToDate,
      
    }
   // console.log(object);

   this.ubtService.getViewUbtDetails(object).subscribe((data:any)=>{
    // console.log(data);
     this.ids= data;
     
   })
   
  }



  onchange($event){
    this.Id=$event
    }

    edit(item){
    var id=item.UbtId
    console.log(id)
      let ubtId={'UbtId':id}

      this.ubtService.getIndividualUbt(ubtId).subscribe((data:any)=>{
        console.log(data);
      })
    }

}
