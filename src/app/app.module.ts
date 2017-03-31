import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AmChartsModule } from 'amcharts3-angular2';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import { WhistleService } from './whistle/whistle.service';
import { SteemService } from './whistle/steem.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmChartsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PollComponent,
  ],
  providers:    [
    WhistleService,
    SteemService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
