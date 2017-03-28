import { Component, OnInit } from '@angular/core';
import { Poll } from '../poll/poll';
import { PollService } from '../poll/poll.service';

@Component({
  selector: 'my-dashboard',
  template: `
    <h1>test</h1>
    <h2>Polls:</h2>
    <div *ngFor="let poll of polls">
      {{poll.title}}
    </div>
  `,
  providers: [
    PollService
  ]
})
export class DashboardComponent implements OnInit {
  polls: Poll[];

  constructor(public pollService: PollService) {}

  ngOnInit(): void {
    this.pollService.getPolls()
      .then(polls => {
        console.log('Polls: ', polls);
        this.polls = polls;
      });
  }
}
