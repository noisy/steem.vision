import { WhistleService } from './whistle.service';
import { ISteemVote, Vote } from './vote';

export interface ISteemPost {
  author: string;
  permlink: string;
  title: string;
  body: string;
  active_votes: ISteemVote[];
  json_metadata: string;
}

export class Post {

  whistleService: WhistleService;
  author: string;
  permlink: string;
  title: string;
  body: string;
  active_votes: Vote[];
  json_metadata: Object;

  static create(whistleService: WhistleService, steemPost: ISteemPost): Post {
    let post: Post = <Post> {
      whistleService: whistleService,
      author: steemPost.author,
      permlink: steemPost.permlink,
      title: steemPost.title,
      body: steemPost.body,
      active_votes: steemPost.active_votes,
      json_metadata: JSON.parse(steemPost.json_metadata)
    };
    return new Post(post);
  }

  constructor(post: Post) {
    this.whistleService = post.whistleService;
    this.author = post.author;
    this.permlink = post.permlink;
    this.title = post.title;
    this.body = post.body;
    this.active_votes = post.active_votes;
    this.json_metadata = post.json_metadata;
  }

  getReplies(): Promise<Post[]> {
    return this.whistleService.getReplies(this.author, this.permlink);
  }

  getVotes(): Promise<Vote[]> {
    return this.whistleService.getVotes(this.author, this.permlink);
  }
}
