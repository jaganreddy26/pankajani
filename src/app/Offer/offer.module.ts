import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SeekofferComponent } from './seekoffer/seekoffer.component';
import { CreateofferComponent } from './createoffer/createoffer.component';


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
    providers: [],
    declarations: [SeekofferComponent, CreateofferComponent],
    exports: [RouterModule],
  })
  export class OfferModule { }