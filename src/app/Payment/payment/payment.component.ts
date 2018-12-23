import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { Payment } from '../../shared/entities/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  ReferenceIds:any=[];
  PaymentModes:any=[]
  PaymentReasons:any=[]
  PaymentTypes:any=[]
  
  payment:any = new Payment()
  constructor(private paymentServive:PaymentService,private alertService :AlertService) {
  
   }

  ngOnInit() {
  }
  
 
  save(){

  }
}
