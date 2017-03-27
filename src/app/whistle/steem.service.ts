import { Injectable } from '@angular/core';

declare var steem: any;

@Injectable()
export class SteemService {
  api = steem.api;
  broadcast = steem.broadcast;
}
