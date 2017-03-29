import { Injectable } from '@angular/core';

import { Poll } from './poll';
import { PollOption } from './polloption';
import { Post } from '../whistle/post';
import { WhistleService } from '../whistle/whistle.service';

@Injectable()
export class PollService {

  constructor(private whistleService: WhistleService) {}

  getPoll(author: string, permlink: string): Promise<Poll> {
    return this.whistleService.getPost(author, permlink).then(post => Poll.createPoll(this, post));
  }

  getPolls(): Promise<Poll[]> {
    return this.whistleService.getPost('noisy2', 'test').then( post => {
      return [Poll.createPoll(this, post)];
    });
  }

  getChoices(author: string, permlink: string): Promise<PollOption[]> {
    return this.whistleService.getReplies(author, permlink);
  }
}
