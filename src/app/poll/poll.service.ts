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
    return this.whistleService.getPost('noisy2', 'test').then((post: Post) => {
      return [Poll.createPoll(this, post)];
    });
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
