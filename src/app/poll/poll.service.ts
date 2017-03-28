import { Injectable } from '@angular/core';
import { WhistleService } from '../whistle/whistle.service';
import { Poll } from './poll';
import { Post } from '../whistle/post';

@Injectable()
export class PollService {

  constructor(private whistleService: WhistleService) {}

  getPolls(): Promise<Poll[]> {
    return this.whistleService.getPost('noisy2', 'test').then( post => {
      return [new Poll(post)];
    });
  }

  fetchOptions(post: Post): Promise<Post[]> {
    return post.getReplies().then((replies: Post[]) => {
      return replies.filter((reply: Post) => reply.author === post.author);
    });
  }
}
