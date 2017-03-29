import { Injectable } from '@angular/core';

import { Poll } from './poll';
import { PollOption } from './polloption';
import { Post } from '../whistle/post';
import { WhistleService } from '../whistle/whistle.service';
import { PollConfig } from './pollconfig';

@Injectable()
export class PollService {

  constructor(private whistleService: WhistleService) {}

  getPoll(author: string, permlink: string): Promise<Poll> {
    return this.whistleService.getPost(author, permlink).then((post: Post) => Poll.createPoll(this, post));
  }

  getPolls(): Promise<Poll[]> {

    let pollsData: any[] = [
      {author: 'clayop', permlink: 'poll-your-opinions-on-hardfork-17-features'},
      {author: 'clayop', permlink: 'voting-test-do-you-think-changing-to-a-flattened-curve-is-urgent'},
      {author: 'noisy2', permlink: 'test'},
    ];

    let polls: Poll[] = [];

    let promises: Promise<Poll>[] = pollsData.map(pollData => {
      return this.whistleService.getPost(pollData.author, pollData.permlink).then((post: Post) => {
        polls.push(Poll.createPoll(this, post));
      });
    });

    return Promise.all(promises).then(() => polls);
  }

  getChoices(author: string, permlink: string, config: PollConfig): Promise<PollOption[]> {
    return this.whistleService.getReplies(author, permlink).then((posts: Post[]) => {

      if (!config.addingChoicesAllowed) {
        posts = posts.filter(post => post.author === author);
      }
      return posts.map(post => new PollOption(post));

    });
  }
}
