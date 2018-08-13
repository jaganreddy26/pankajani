

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login.component';
import { LogiinInService } from './login.service';









//routing pathes 

const routes: Routes = [
  
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
  






];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [LogiinInService],
  declarations: [LoginComponent],
  exports: [RouterModule],
})
export class LoginModule { }