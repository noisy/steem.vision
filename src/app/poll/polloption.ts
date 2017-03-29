import { PollVote } from './pollvote';
import { IPost, Post} from '../whistle/post';

export class PollOption extends Post {
  votes: PollVote[];

  constructor(post: IPost) {
    super(post);
  }
}
