import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WhistleService } from './whistle/whistle.service';
import { SteemService } from './whistle/steem.service';
import { PollComponent } from './poll/poll.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'poll/:author/:permlink',
        component: PollComponent
      },
    ])
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
