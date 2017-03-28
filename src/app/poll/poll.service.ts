import { Injectable } from '@angular/core';

import { Poll } from './poll';
import { PollOption } from './polloption';
import { Post } from '../whistle/post';
import { WhistleService } from '../whistle/whistle.service';

@Injectable()
export class PollService {

  constructor(private whistleService: WhistleService) {}

  getPolls(): Promise<Poll[]> {
    return this.whistleService.getPost('noisy2', 'test').then( post => {
      return [new Poll(post)];
    });
  }

  fetchOptions(post: Post): Promise<PollOption[]> {
    return post.getReplies().then((replies: Post[]) => {
      return replies
        .filter((reply: Post) => reply.author === post.author)
        .map((reply: Post) => {
          return new PollOption(reply);
        });
    });
  }
}
