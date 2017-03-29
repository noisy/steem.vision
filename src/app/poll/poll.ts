import { IPost, Post } from '../whistle/post';
import { PollOption } from './polloption';
import { PollService } from './poll.service';

export class Poll extends Post {
  pollService: PollService;
  // pollOptions: PollOption[];

  static createPoll(pollService: PollService, post: Post): Poll {
    let poll: Poll = <Poll> post;
    poll.pollService = pollService;

    let createdPoll = new Poll(poll);
    return createdPoll;
  }

  constructor(post: Post) {
    super(post);
  }

  getChoices(): Promise<PollOption[]> {
    return this.pollService.getChoices(this.author, this.permlink);
  }
}
