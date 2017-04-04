import { SteemService } from './steem.service';
import { ISteemPost, Post } from './post';
import { Injectable } from '@angular/core';
import { Vote } from './vote';


@Injectable()
export class WhistleService {

  constructor(private steemService: SteemService) {}

  getPost(author: string, permlink: string): Promise<Post> {
    return this.steemService.api.getContent(author, permlink)
      .then((steemPost: ISteemPost) => Post.create(this, steemPost));
  }

  getReplies(author: string, permlink: string): Promise<Post[]> {
    return this.steemService.api.getContentReplies(author, permlink)
      .then((steemPosts: ISteemPost[]) => {
        return steemPosts.map((steemPost: ISteemPost) => Post.create(this, steemPost));
      });
  }

  getVotes(author: string, permlink: string): Promise<Vote[]> {
    // we are not creating instances of Vote classes,
    // because so far there is no methods in Vote class
    return this.steemService.api.getActiveVotes(author, permlink);
  }

  logIn(author: string, passwordOrWif: string) {
    let postingPriv: string;

    if (this.steemService.auth.isWif(passwordOrWif)) {
      postingPriv = passwordOrWif;
    } else {
      postingPriv = this.steemService.auth.toWif(author, passwordOrWif, 'posting');
    }

    let postingPub = this.steemService.auth.wifToPublic(postingPriv);
    return new Promise((resolve, reject) => {

      this.steemService.api.getAccounts([author]).then((result: any, err: any) => {
        let account = result[0];
        return account.posting.key_auths[0][0];
      }).then((posting: string) => {
        resolve(postingPub === posting);
      });
    });
  }
}
