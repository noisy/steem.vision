import { Post } from '../whistle/post';
import { PollOption } from './polloption';
import { PollService } from './poll.service';
import { POLL_DEFAULT_CONFIG, POLL_CONFIG_JSON_METADATA_NAME, PollConfig} from './pollconfig';

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
    if (this.json_metadata.hasOwnProperty(POLL_CONFIG_JSON_METADATA_NAME)) {
      let metadata = this.json_metadata[POLL_CONFIG_JSON_METADATA_NAME];
      this.config = {
        addingChoicesAllowed: metadata.adding_choices_allowed
      };
    } else {
      this.config = POLL_DEFAULT_CONFIG;
    }
  }
}
