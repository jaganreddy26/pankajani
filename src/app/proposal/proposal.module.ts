import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SeekproposalComponent } from './seekproposal/seekproposal.component';
import { ViewproposalComponent } from './viewproposal/viewproposal.component';
import { AmendproposalComponent } from './amendproposal/amendproposal.component';
import { ApproveproposalComponent } from './approveproposal/approveproposal.component';
import { ConformproposalComponent } from './conformproposal/conformproposal.component';
import {ProposalServiceService} from './proposal.service';









//routing pathes 

const routes: Routes = [
  
    { path: 'SeekProposal', component: SeekproposalComponent},
    { path: 'ViewProposal', component: ViewproposalComponent},
    { path: 'AmendProposal', component: AmendproposalComponent},
    { path: 'ApproveProposal', component: ApproveproposalComponent},
    { path: 'ConfirmProposal', component: ConformproposalComponent},
  






];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [ProposalServiceService],
  declarations: [SeekproposalComponent, ViewproposalComponent, AmendproposalComponent, ApproveproposalComponent, ConformproposalComponent],
  exports: [RouterModule],
})
export class ProposalModule { }