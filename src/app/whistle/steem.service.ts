import { Injectable } from '@angular/core';

declare var steem: any;

@Injectable()
export class SteemService {
  auth = steem.auth;
  api = steem.api;
  broadcast = steem.broadcast;
}
