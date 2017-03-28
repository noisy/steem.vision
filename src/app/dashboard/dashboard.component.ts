import { Component } from '@angular/core';
import { Poll } from '../poll/poll';

@Component({
  selector: 'my-dashbord',
  template: '<h1>test</h1>',
})
export class DashboardComponent {
  polls: Poll[];
}
