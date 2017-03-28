import { PollVote } from './pollvote';
import { Post } from '../whistle/post';

export class PollOption {
  title: string;
  votes: PollVote[];

  constructor(post: Post) {
    this.title = post.title;
  }
}
