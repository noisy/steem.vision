import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Poll } from '../poll/poll';
import { PollService } from '../poll/poll.service';
import { PollOption } from './polloption';
import { Vote } from '../whistle/vote';

declare var AmCharts: any;

@Component({
  selector: 'my-poll',
  template: `
    <div *ngIf='poll'>
      <h1>{{poll.title}}</h1>
      <p><a href="http://steemit.com/@{{poll.author}}/{{poll.permlink}}">Link to Steemit Post</a></p>
      <h3>Description:</h3>
      <div>{{poll.body}}</div>
      <h3>Options:</h3>
      <div *ngFor='let option of options'>{{option.body}} - {{option.active_votes.length}}</div>
      <div id="chartdiv" style="width: 100%; height: 400px;" ></div>
    </div>
  `,
  providers: [
    PollService
  ]
})
export class PollComponent implements OnInit {
  poll: Poll;
  options: PollOption[] = [];

  chart: any;

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

          let votePromises: Promise<Vote[]>[] = [];
          this.options.forEach((option: PollOption) => {
            votePromises.push(option.getVotes().then(votes => option.active_votes = votes));
          });

          Promise.all(votePromises).then(() => {

            let data = this.options.map( option => ({title: option.body, value: option.active_votes.length}));

            this.chart = AmCharts.makeChart('chartdiv',
              {
                'type': 'pie',
                'theme': 'light',
                'dataProvider': data,
                'titleField': 'title',
                'valueField': 'value',
                'labelRadius': 5,

                'radius': '42%',
                'innerRadius': '60%',
                'labelText': '[[title]]',
                'export': {
                  'enabled': true
                }
              }
            );
          });
        });
      });
  }
}
