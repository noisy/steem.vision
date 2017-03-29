import { WhistleService } from './whistle.service';
import { Vote } from './vote';

export interface ISteemPost {
  author: string;
  permlink: string;
  title: string;
  body: string;
}

export interface IPost extends ISteemPost {
  whistleService: WhistleService;
  author: string;
  permlink: string;
  title: string;
  body: string;
}

export class Post {

  whistleService: WhistleService;
  author: string;
  permlink: string;
  title: string;
  body: string;

  static create(whistleService: WhistleService, steemPost: ISteemPost) {
    let post: IPost = {
      whistleService: whistleService,
      author: steemPost.author,
      permlink: steemPost.permlink,
      title: steemPost.title,
      body: steemPost.body,
    };
    return new Post(post);
  }

  constructor(post: IPost) {
    this.author = post.author;
    this.permlink = post.permlink;
    this.title = post.title;
    this.body = post.body;
    this.whistleService = post.whistleService;
  }

  getReplies(): Promise<Post[]> {
    return this.whistleService.getReplies(this.author, this.permlink);
  }

  getVotes(): Promise<Vote[]> {
    return this.whistleService.getVotes(this.author, this.permlink);
  }
}
