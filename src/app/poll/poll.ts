import { Post } from '../whistle/post';
import { PollOption } from './polloption';

export class Poll {
  title: string;

  pollOptions: PollOption[];

  constructor(post: Post) {
    this.title = post.title;
  }
}
