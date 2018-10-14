import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';

const routes: Routes = [
  { path: 'bankdetails', component:BankdetailsComponent},
  { path: 'plantdetails', component:PlantdetailsComponent },
 
   ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [],
    declarations: [BankdetailsComponent, PlantdetailsComponent],
    exports: [RouterModule],
  })
  export class MasterDataModule { }