import { IPost, Post } from '../whistle/post';
import { PollOption } from './polloption';

export class Poll extends Post {
  pollOptions: PollOption[];

  constructor(post: IPost) {
    super(post);
  }
  }
}
