//share module is a common module of the all moduless
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApexService } from "./service/apex.service";
import { ReportService } from "./service/report.service";
import { FormMessagesComponent } from './components/form-message.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppInterceptor } from './service/app.interceptor';
import { AppService } from './service/app.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';
import { FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe } from './utils/pipes';
import { CollapseModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AlertComponent } from './alerts/_directives/alert.component';
import { AlertService } from './alerts/_services/alert.service';
import { ButtonsModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
// import { ParticlesModule } from 'angular-particle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import { TreeModule } from 'angular-tree-component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';







@NgModule({
    //to import the modules
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        PaginationModule,
        CollapseModule.forRoot(),
        NgSelectModule,
        MatDatepickerModule,
        BsDatepickerModule.forRoot(),
        ButtonsModule.forRoot(),
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        TooltipModule.forRoot(),
        TimepickerModule.forRoot(),
        TypeaheadModule,
        RouterModule,
        SidebarModule.forRoot(),
        FormsModule, MatButtonModule, MatCheckboxModule, MatStepperModule,
         MatIconModule, FlexLayoutModule, MatExpansionModule, MatTabsModule, 
         MatCardModule, MatInputModule,MatSelectModule,MatTableModule,MatListModule
         ,MatChipsModule,MatToolbarModule,MatTreeModule,TreeModule.forRoot(),NgxPaginationModule,MatRadioModule,MatDialogModule


        //
        //FileUploadModule
    ],
    //to declare the components,pipes,directives
    declarations: [
        FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe, FormMessagesComponent, AlertComponent

    ],
    // to export all we have to use in another component
    exports: [
        FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe,
        CommonModule, FormsModule, ReactiveFormsModule, ModalModule, PaginationModule, FormMessagesComponent, CollapseModule, ButtonsModule,
        CollapseModule, NgSelectModule,MatDatepickerModule, AlertComponent,
        BrowserAnimationsModule, AngularFontAwesomeModule, SidebarModule
        , TooltipModule, TimepickerModule, TypeaheadModule, BsDatepickerModule, MatButtonModule, MatCheckboxModule, MatStepperModule, MatIconModule,
         FlexLayoutModule, MatExpansionModule, MatTabsModule, MatCardModule, MatInputModule,MatSelectModule,MatTableModule,MatListModule,MatChipsModule
         ,MatToolbarModule,MatTreeModule,TreeModule,NgxPaginationModule,MatRadioModule,MatDialogModule

    ],
    // to declare the services in providers
    providers: [AppService, ApexService, ReportService, AlertService, FormBuilder]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppInterceptor,
                    multi: true
                }
            ],
        };
    }
}
