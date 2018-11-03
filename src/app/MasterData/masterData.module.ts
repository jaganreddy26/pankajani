import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';
import {MasterService} from './master.service';
import { AddBusinessComponent } from './add-business/add-business.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCompanyeditComponent } from './add-companyedit/add-companyedit.component';
const routes: Routes = [
  { path: 'addbusiness', component:AddBusinessComponent},
  { path: 'addcompany', component:AddCompanyComponent },
  { path: 'bankdetails', component:BankdetailsComponent},
  { path: 'plantdetails', component:PlantdetailsComponent },
 
   ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [MasterService],
    declarations: [BankdetailsComponent, PlantdetailsComponent, AddBusinessComponent, AddCompanyComponent, AddCompanyeditComponent],
    exports: [RouterModule],
  })
  export class MasterDataModule { }