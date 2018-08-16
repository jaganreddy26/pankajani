import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { CreateubtComponent } from './createubt/createubt.component';
import { ViewubtComponent } from './viewubt/viewubt.component';
import { AmendubtComponent } from './amendubt/amendubt.component';
import { ConformbiddingComponent } from './conformbidding/conformbidding.component';
import { CloseubtComponent } from './closeubt/closeubt.component';

import {UbtService} from '../ubt/ubt.service'








//routing pathes 

const routes: Routes = [
  
    { path: 'CreateUBT', component: CreateubtComponent},
    { path: 'ViewUBT', component: ViewubtComponent},
    { path: 'AmendUBT', component: AmendubtComponent},
    { path: 'ConfirmBidding', component: ConformbiddingComponent},
    { path: 'CloseUBT', component: CloseubtComponent},
  






];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [UbtService],
  declarations: [CreateubtComponent, ViewubtComponent, AmendubtComponent, ConformbiddingComponent, CloseubtComponent],
  exports: [RouterModule],
})
export class UbtModule { }