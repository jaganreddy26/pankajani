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
import { EditbusinessComponent } from './editbusiness/editbusiness.component';
import { EditbankdetailsComponent } from './editbankdetails/editbankdetails.component';
import { EditplantComponent } from './editplant/editplant.component';
import { AreaofBusinessComponent } from './areaof-business/areaof-business.component';
const routes: Routes = [
  { path: 'addbusiness', component:AddBusinessComponent},
  { path: 'addcompany', component:AddCompanyComponent },
  { path: 'bankdetails', component:BankdetailsComponent},
  { path: 'plantdetails', component:PlantdetailsComponent },
  { path: 'areaofBusiness', component:AreaofBusinessComponent },
 
   ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [MasterService],
    declarations: [BankdetailsComponent, PlantdetailsComponent, AddBusinessComponent, AddCompanyComponent, AddCompanyeditComponent, EditbusinessComponent, EditbankdetailsComponent, EditplantComponent, AreaofBusinessComponent],
    exports: [RouterModule],
  })
  export class MasterDataModule { }