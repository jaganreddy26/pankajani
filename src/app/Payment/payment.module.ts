import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import {PaymentService} from './payment.service';

const routes: Routes = [
    { path: 'Expenses', component:ExpensesComponent},
    { path: 'AdvancePayment', component:AdvancePaymentComponent },
   
  ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [PaymentService],
    declarations: [ExpensesComponent, AdvancePaymentComponent],
    exports: [RouterModule],
  })
  export class PaymentModule { }