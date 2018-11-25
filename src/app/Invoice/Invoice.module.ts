import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import {InvoiceService} from './invoice.service';
import { InvoiceComponent } from './invoice/invoice.component';
const routes: Routes = [
    { path: 'Invoice', component:InvoiceComponent},
  
   
  ];

  @NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [InvoiceService],
    declarations: [InvoiceComponent],
    exports: [RouterModule],
  })
  export class InvoiceModule { }