import { WhistleService } from './whistle.service';

export interface IPost {
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

  static create(whistleService: WhistleService, json: any) {
    let post: IPost = {
      whistleService: whistleService,
      author: json.author,
      permlink: json.permlink,
      title: json.title,
      body: json.body,
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
}
