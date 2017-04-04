import {WhistleService} from './whistle.service';

export interface  IPubKeyAndWeight extends Array<string|number> {
  0: string;
  1: number;
}

export interface  IAccountNameAndWeight extends Array<string|number> {
  0: string;
  1: number;
}

export interface IWif {
  weight_threshold: number;
  account_auths: IAccountNameAndWeight[];
  key_auths: IPubKeyAndWeight[];
}

export interface ISteemAccount {
  id: number;
  name: string;
  owner: IWif;
  active: IWif;
  posting: IWif;
  memo_key: string;
  json_metadata: string;
  proxy: string;
  last_owner_update: string;
  last_account_update: string;
  created: string;
  mined: boolean;
  owner_challenged: boolean;
  active_challenged: boolean;
  last_owner_proved: string;
  last_active_proved: string;
  recovery_account: string;
  last_account_recovery: string;
  reset_account: string;
  comment_count: number;
  lifetime_vote_count: number;
  post_count: number;
  can_vote: boolean;
  voting_power: number;
  last_vote_time: string;
  balance: string;
  savings_balance: string;
  sbd_balance: string;
  sbd_seconds: string;
  sbd_seconds_last_update: string;
  sbd_last_interest_payment: string;
  savings_sbd_balance: string;
  savings_sbd_seconds: string;
  savings_sbd_seconds_last_update: string;
  savings_sbd_last_interest_payment: string;
  savings_withdraw_requests: number;
  reward_sbd_balance: string;
  reward_steem_balance: string;
  reward_vesting_balance: string;
  reward_vesting_steem: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  vesting_withdraw_rate: string;
  next_vesting_withdrawal: string;
  withdrawn: number;
  to_withdraw: number;
  withdraw_routes: number;
  curation_rewards: number;
  posting_rewards: number;
  proxied_vsf_votes: number[];
  witnesses_voted_for: number;
  average_bandwidth: number;
  lifetime_bandwidth: string;
  last_bandwidth_update: string;
  average_market_bandwidth: number;
  last_market_bandwidth_update: string;
  last_post: string;
  last_root_post: string;
  post_bandwidth: number;
  new_average_bandwidth: string;
  new_average_market_bandwidth: number;
  vesting_balance: string;
  reputation: string;
  transfer_history: any[];
  market_history: any[];
  post_history: any[];
  vote_history: any[];
  other_history: any[];
  witness_votes: string[];
  tags_usage: any[];
  guest_bloggers: any[];
  blog_category: any;
}


let example2: ISteemAccount =   {
  'id': 8226,
  'name': 'noisy',
  'owner': {
    'weight_threshold': 1,
    'account_auths': [],
    'key_auths': [
      [
        'STM5w2QJZYLrjSp1sD1fAr2X6SUfEYFE2u15VMNtW3P2PMTLqZXdJ',
        1
      ]
    ]
  },
  'active': {
    'weight_threshold': 1,
    'account_auths': [],
    'key_auths': [
      [
        'STM7ZGEh6TpFTF7fVEraizVGmHjTdT1R5zp4bWj2HgQyn1DTRaJUK',
        1
      ]
    ]
  },
  'posting': {
    'weight_threshold': 1,
    'account_auths': [
      [
        'streemian',
        1
      ]
    ],
    'key_auths': [
      [
        'STM63hv2yMew6CWNW8UtUbNAYpTpM6bJuYDRxn9xAU8oVoZwv3if1',
        1
      ]
    ]
  },
  'memo_key': 'STM5AVpzWZ5bazaEZ1cujAiWr68TfELvRk99NEeFYNWBLYT3ZZMXp',
  'json_metadata': '{"profile":{"profile_image":"https://cloud.githubusercontent.com/assets/201263/20160146/5523f176-a6e5-11e6-95bb-074e0cf0b477.png","name":"Krzysztof Szumny","about":"Software Developer, Entrepreneur, Blogger","location":"Oława, Poland"}}',
  'proxy': '',
  'last_owner_update': '2017-01-01T23:39:18',
  'last_account_update': '2017-02-15T15:26:21',
  'created': '2016-05-10T07:57:00',
  'mined': false,
  'owner_challenged': false,
  'active_challenged': false,
  'last_owner_proved': '1970-01-01T00:00:00',
  'last_active_proved': '1970-01-01T00:00:00',
  'recovery_account': 'steem',
  'last_account_recovery': '1970-01-01T00:00:00',
  'reset_account': 'null',
  'comment_count': 0,
  'lifetime_vote_count': 0,
  'post_count': 952,
  'can_vote': true,
  'voting_power': 9950,
  'last_vote_time': '2017-04-04T00:23:15',
  'balance': '0.000 STEEM',
  'savings_balance': '0.000 STEEM',
  'sbd_balance': '9.311 SBD',
  'sbd_seconds': '4934752035',
  'sbd_seconds_last_update': '2017-03-29T16:18:51',
  'sbd_last_interest_payment': '2017-03-10T13:35:12',
  'savings_sbd_balance': '0.000 SBD',
  'savings_sbd_seconds': '0',
  'savings_sbd_seconds_last_update': '1970-01-01T00:00:00',
  'savings_sbd_last_interest_payment': '1970-01-01T00:00:00',
  'savings_withdraw_requests': 0,
  'reward_sbd_balance': '0.000 SBD',
  'reward_steem_balance': '0.000 STEEM',
  'reward_vesting_balance': '0.000000 VESTS',
  'reward_vesting_steem': '0.000 STEEM',
  'vesting_shares': '80526565.219067 VESTS',
  'delegated_vesting_shares': '0.000000 VESTS',
  'received_vesting_shares': '0.000000 VESTS',
  'vesting_withdraw_rate': '0.000000 VESTS',
  'next_vesting_withdrawal': '1969-12-31T23:59:59',
  'withdrawn': 0,
  'to_withdraw': 0,
  'withdraw_routes': 0,
  'curation_rewards': 104064,
  'posting_rewards': 2983471,
  'proxied_vsf_votes': [0, 0, 0, 0],
  'witnesses_voted_for': 15,
  'average_bandwidth': 239585387,
  'lifetime_bandwidth': '1323494000000',
  'last_bandwidth_update': '2017-03-30T14:05:21',
  'average_market_bandwidth': 175843988,
  'last_market_bandwidth_update': '2017-03-22T18:05:39',
  'last_post': '2017-03-31T21:58:42',
  'last_root_post': '2017-03-17T18:03:15',
  'post_bandwidth': 10000,
  'new_average_bandwidth': '13940571488',
  'new_average_market_bandwidth': 1070000000,
  'vesting_balance': '0.000 STEEM',
  'reputation': '12418225937346',
  'transfer_history': [],
  'market_history': [],
  'post_history': [],
  'vote_history': [],
  'other_history': [],
  'witness_votes': [
    'abit',
    'busy.witness',
    'chainsquad.com',
    'dantheman',
    'good-karma',
    'gtg',
    'ihashfury',
    'jesta',
    'klye',
    'krnel',
    'proctologic',
    'roadscape',
    'roelandp',
    'someguy123',
    'timcliff'
  ],
  'tags_usage': [],
  'guest_bloggers': [],
  'blog_category': {}
};

console.log(example2);


export class Account {
  _data: ISteemAccount;

  create(whistle: WhistleService, rawAccount: ISteemAccount) {
    this._data = rawAccount;
  }

  //getPosts
  //getFollowers
  //follow
  //upvote(Post)
}
