import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WhistleService } from './whistle/whistle.service';
import { SteemService } from './whistle/steem.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers:    [
    WhistleService,
    SteemService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
