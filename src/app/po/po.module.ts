import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SeekpoComponent } from './seekpo/seekpo.component';
import { ViewpoComponent } from './viewpo/viewpo.component';
import { AmendpoComponent } from './amendpo/amendpo.component';
import { ApprovepoComponent } from './approvepo/approvepo.component';
import { ConformpoComponent } from './conformpo/conformpo.component';
import { RevisedPOComponent } from './revised-po/revised-po.component';














//routing pathes 

const routes: Routes = [
  
    { path: 'SeekPO', component: SeekpoComponent},
    { path: 'ViewPO', component: ViewpoComponent},
    { path: 'AmendPO', component: AmendpoComponent},
    { path: 'ApprovePO', component: ApprovepoComponent},
    { path: 'ConfirmPO', component: ConformpoComponent},
    {path:  'RevisedPO',component:RevisedPOComponent}





];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [],
  declarations: [SeekpoComponent,ViewpoComponent,AmendpoComponent,ApprovepoComponent,ConformpoComponent, RevisedPOComponent],
  exports: [RouterModule],
})
export class PoModule { }