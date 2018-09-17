import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import {PermissionService} from './permission.service';
import { SeekpermissionComponent } from './seekpermission/seekpermission.component';
import { ViewpermissionComponent } from './viewpermission/viewpermission.component';
import { AmendpermissionComponent } from './amendpermission/amendpermission.component';
import { ApprovepermissionComponent } from './approvepermission/approvepermission.component';
import { ConfirmpermissionComponent } from './confirmpermission/confirmpermission.component';

//routing pathes 

const routes: Routes = [
  { path: 'SeekPermission', component: SeekpermissionComponent},
  { path: 'ViewPermission', component: ViewpermissionComponent},
  { path: 'AmendPermission', component: AmendpermissionComponent},
  { path: 'ApprovePermission', component: ApprovepermissionComponent},
  { path: 'ConfirmPermission', component: ConfirmpermissionComponent},
];

@NgModule({
    imports: [
  
  
      CommonModule,
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
     SharedModule.forRoot()
     ],
    providers: [PermissionService],
    declarations: [SeekpermissionComponent, ViewpermissionComponent, AmendpermissionComponent, ApprovepermissionComponent, ConfirmpermissionComponent],
    exports: [RouterModule],
  })
  export class PermissionModule { }