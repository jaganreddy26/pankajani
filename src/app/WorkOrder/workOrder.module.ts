import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { CreateworkorderComponent } from './createworkorder/createworkorder.component';
import { ViewworkorderComponent } from './viewworkorder/viewworkorder.component';
import { AmendworkorderComponent } from './amendworkorder/amendworkorder.component';
import { ApproveworkorderComponent } from './approveworkorder/approveworkorder.component';
import {WorkorderService} from './workorder.service';
import { RevisedWOComponent } from './revised-wo/revised-wo.component';
import { CancelwoComponent } from './cancelwo/cancelwo.component';
const routes: Routes = [
     { path: 'Createworkorder', component:CreateworkorderComponent},
     { path: 'Viewworkorder', component:ViewworkorderComponent},
     { path: 'Amendworkorder', component:AmendworkorderComponent},
     { path: 'Approveworkorder', component:ApproveworkorderComponent},
     {path: 'RevisedWO',component:RevisedWOComponent},
     {path:'cancelWo',component:CancelwoComponent}
   
  ];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [WorkorderService],
    declarations: [CreateworkorderComponent, ViewworkorderComponent, AmendworkorderComponent, ApproveworkorderComponent, RevisedWOComponent, CancelwoComponent],
    exports: [RouterModule],
  })
  export class WorkOrderModule { }