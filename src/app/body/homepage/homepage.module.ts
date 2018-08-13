import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './homepage.component';








//routing pathes 

const routes: Routes = [
  
    { path: 'home', component: HomePageComponent},
  






];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [],
  declarations: [HomePageComponent],
  exports: [RouterModule],
})
export class HomePageModule { }