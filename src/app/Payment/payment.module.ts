import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import {PaymentService} from './payment.service';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
    { path: 'Expenses', component:ExpensesComponent},
    { path: 'AdvancePayment', component:AdvancePaymentComponent },
    { path: 'Payment', component:PaymentComponent },
   
  ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [PaymentService],
    declarations: [ExpensesComponent, PaymentComponent,AdvancePaymentComponent],
    exports: [RouterModule],
  })
  export class PaymentModule { }