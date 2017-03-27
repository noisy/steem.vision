import { WhistleService } from './whistle.service';

export class Post {
  author: string;
  permlink: string;
  title: string;
  body: string;

  constructor(private whistleService: WhistleService, json: any) {
    this.author = json.author;
    this.permlink = json.permlink;
    this.title = json.title;
    this.body = json.body;
  }
}
