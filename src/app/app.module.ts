import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './providers/data.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule } from '@angular/forms';

import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ItComponent } from './it/it.component';
import { AdminComponent } from './admin/admin.component';
import { HrComponent } from './hr/hr.component';
import { FinanceComponent } from './finance/finance.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItComponent,
    AdminComponent,
    HrComponent,
    FinanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    GoogleChartsModule.forRoot(),
    AppRoutingModule 
  ],
  providers: [DataService, DatePipe, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
