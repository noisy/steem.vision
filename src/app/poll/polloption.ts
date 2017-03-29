import { PollVote } from './pollvote';
import { Post} from '../whistle/post';

export class PollOption extends Post {
  votes: PollVote[];

  constructor(post: Post) {
    super(post);
  }
}
