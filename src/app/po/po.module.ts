import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SeekpoComponent } from './seekpo/seekpo.component';
import { ViewpoComponent } from './viewpo/viewpo.component';










//routing pathes 

const routes: Routes = [
  
    { path: 'SeekPO', component: SeekpoComponent},
    { path: 'ViewPO', component: ViewpoComponent},
  






];

@NgModule({
  imports: [


    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,useHash:true }),
   SharedModule.forRoot()
   ],
  providers: [],
  declarations: [SeekpoComponent,ViewpoComponent],
  exports: [RouterModule],
})
export class PoModule { }