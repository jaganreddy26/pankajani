import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
// import { HashLocationStrategy, LocationStrategy,PathLocationStrategy } from '@angular/common';
import { HomePageModule } from './body/homepage/homepage.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LoginModule } from './login/login.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UbtModule } from './ubt/ubt.module';
import { PoModule } from './po/po.module';
import { ProposalModule } from './proposal/proposal.module';
import {PermissionModule} from './permission/permission.module';
import {OfferModule} from './Offer/offer.module';
import {WorkOrderModule} from './WorkOrder/workOrder.module';
import {MasterDataModule} from './MasterData/masterData.module';
import {PaymentModule} from './Payment/payment.module';
import {InvoiceModule} from './Invoice/Invoice.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    HomePageModule,
    TabsModule.forRoot(),
    LoginModule,
    HttpClientModule,
    MatToolbarModule,
    UbtModule,
    PoModule,
    ProposalModule,
    PermissionModule,
    OfferModule,
    WorkOrderModule,
    MasterDataModule,
    PaymentModule,
    InvoiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
