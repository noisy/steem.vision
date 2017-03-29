

export interface ISteemVote {
  percent: number;
  reputation: string;
  rshares: string;
  time: string;
  voter: string;
  weight: string;
}

export class Vote implements ISteemVote {
  percent: number;
  reputation: string;
  rshares: string;
  time: string;
  voter: string;
  weight: string;
}
