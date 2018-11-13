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
import { VendorComponent } from './vendor/vendor.component';
import { EditAreaBusinessComponent } from './edit-area-business/edit-area-business.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { AgencyComponent } from './agency/agency.component';
import { GoodstypeComponent } from './goodstype/goodstype.component';
import { AgencyEditComponent } from './agency-edit/agency-edit.component';
import { GoodstypeEditComponent } from './goodstype-edit/goodstype-edit.component';
import { CategoryComponent } from './category/category.component';
import { CategoryeditComponent } from './categoryedit/categoryedit.component';
const routes: Routes = [
  { path: 'addbusiness', component:AddBusinessComponent},
  { path: 'addcompany', component:AddCompanyComponent },
  { path: 'bankdetails', component:BankdetailsComponent},
  { path: 'plantdetails', component:PlantdetailsComponent },
  { path: 'areaofBusiness', component:AreaofBusinessComponent },
  { path: 'vendor',component:VendorComponent},
  { path: 'agency',component:AgencyComponent},
  { path: 'goodstype',component:GoodstypeComponent},
  { path: 'category',component:CategoryComponent},
   ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [MasterService],
    declarations: [BankdetailsComponent, PlantdetailsComponent, AddBusinessComponent, AddCompanyComponent, AddCompanyeditComponent, EditbusinessComponent, EditbankdetailsComponent, EditplantComponent,
       AreaofBusinessComponent, VendorComponent, EditAreaBusinessComponent,
        VendorEditComponent,AgencyComponent, GoodstypeComponent, AgencyEditComponent, GoodstypeEditComponent, CategoryComponent, CategoryeditComponent],
    exports: [RouterModule],
  })
  export class MasterDataModule { }