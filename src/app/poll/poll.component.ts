import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Poll } from '../poll/poll';
import { PollService } from '../poll/poll.service';
import { PollOption } from './polloption';

@Component({
  selector: 'my-poll',
  template: `
    <h1 *ngIf="poll">{{poll.title}}</h1>
    <h3>Options:</h3>
    <div *ngFor="let option of options">{{option.body}} - {{option.active_votes.length}}</div>
  `,
  providers: [
    PollService
  ]
})
export class PollComponent implements OnInit {
  poll: Poll;
  options: PollOption[] = [];

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.pollService.getPoll(params['author'], params['permlink']))
      .subscribe(poll => {
        this.poll = poll;
        this.poll.getChoices().then((choices: PollOption[]) => {
          this.options = choices;
          this.options.forEach((option: PollOption) => {
            option.getVotes().then(votes => option.active_votes = votes);
          });
        });
      });
  }
}
