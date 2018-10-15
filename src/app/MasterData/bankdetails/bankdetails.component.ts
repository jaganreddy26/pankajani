import { Component, OnInit } from '@angular/core';
import { BankDetails } from '../../shared/entities/bankDetails';


@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
   bank:any=[]
   bankDetails:any = new BankDetails();
  constructor() {
    this.bank.push(this.bankDetails)
   }

  ngOnInit() {
  
  }
  changeDeafaultAc($event,item){
  item.DeafaultAc = $event.value;
  }
  add(){
  this.bank.push(new BankDetails())
  }
  save(){
    console.log(this.bank)
  }
}
