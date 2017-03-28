import { SteemService } from './steem.service';
import { Post } from './post';
import { Injectable } from '@angular/core';


@Injectable()
export class WhistleService {

  constructor(private steemService: SteemService) {}

  getPost(author: string, permlink: string): Promise<Post> {
    return this.steemService.api.getContent(author, permlink)
      .then((rawPost: any) => {
        return new Post(this, rawPost);
      });
  }

  getReplies(author: string, permlink: string): Promise<Post[]> {
    return this.steemService.api.getContentReplies(author, permlink)
      .then((rawPosts: any[]) => {
        return rawPosts.map((rawPost: any) => new Post(this, rawPost));
      });
  }
}
