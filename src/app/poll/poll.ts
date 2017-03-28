import { Post } from '../whistle/post';
import { PollOption } from './polloption';

export class Poll {
  title: string;
  author: string;
  permlink: string;

  pollOptions: PollOption[];

  constructor(post: Post) {
    this.title = post.title;
    this.author = post.author;
    this.permlink = post.permlink;
  }
}
