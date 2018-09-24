import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SeekofferComponent } from './seekoffer/seekoffer.component';
import { CreateofferComponent } from './createoffer/createoffer.component';
import {OfferService} from './offer.service';

const routes: Routes = [
    { path: 'Seekoffer', component:SeekofferComponent},
    { path: 'Createoffer', component:CreateofferComponent },
   
  ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [OfferService],
    declarations: [SeekofferComponent, CreateofferComponent],
    exports: [RouterModule],
  })
  export class OfferModule { }