import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableStandardComponent } from './ui/table-standard/table-standard.component';
import { HttpClientModule } from '@angular/common/http';
//prime ui

import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    TableStandardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, DataTablesModule, ChartModule,
    ToastModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
