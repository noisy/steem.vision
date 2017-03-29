import { Post } from '../whistle/post';
import { PollOption } from './polloption';
import { PollService } from './poll.service';
import { PollConfig } from './pollconfig';

export class Poll extends Post {
  pollService: PollService;
  config: PollConfig;
  // pollOptions: PollOption[];

  static createPoll(pollService: PollService, post: Post): Poll {
    let poll: Poll = <Poll> post;
    poll.pollService = pollService;

    let createdPoll = new Poll(poll);
    createdPoll._loadConfig();
    return createdPoll;
  }

  constructor(poll: Poll) {
    super(poll);
    this.pollService = poll.pollService;
  }

  getChoices(): Promise<PollOption[]> {
    return this.pollService.getChoices(this.author, this.permlink, this.config);
  }

  private _loadConfig(): void {
    this.config = {
      addingChoicesAllowed: this.json_metadata['poll_config'].adding_choices_allowed
    };
  }
}
