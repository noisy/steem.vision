import { PollVote } from './pollvote';
import { Post } from '../whistle/post';

export class PollOption {
  votes: PollVote[];

  constructor(post: Post) {}
}
