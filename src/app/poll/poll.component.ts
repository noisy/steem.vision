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
    <div *ngFor="let option of options">{{option.title}}</div>
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
        this.options = [
          <PollOption>{title: 'option 1'},
          <PollOption>{title: 'option 2'},
        ];
      });
  }
}
