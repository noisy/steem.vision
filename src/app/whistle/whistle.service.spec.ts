import { TestBed, async, inject } from '@angular/core/testing';

import { WhistleService } from './whistle.service';
import { SteemService} from './steem.service';
import { ISteemPost, Post } from './post';
import { ISteemVote, Vote } from './vote';

describe('WhistleService', () => {

  class SteemServiceStub {
    api = {
      getContent: () => {},
      getContentReplies: () => {},
      getActiveVotes: () => {},
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        WhistleService,
        { provide: SteemService, useClass: SteemServiceStub}
      ]
    }).compileComponents();
  }));

  it('should be injectable', inject([WhistleService], (whistleService: WhistleService) => {
    expect(whistleService).toBeDefined();
  }));

  it('should has getPost method which return Promise<Post>', async(inject(
    [WhistleService, SteemService],
    (whistleService: WhistleService, steemService: SteemService) => {

      let expectedResponse: ISteemPost = {
        author: 'noisy',
        permlink: 'harry-potter-7',
        title: 'Review of Harry Potter Deathly Hallows',
        body: 'Review ...',
        active_votes: [],
      };

      let spy = spyOn(steemService.api, 'getContent').and.returnValue(Promise.resolve(expectedResponse));

      whistleService.getPost('noisy', 'permlink').then((response) => {
        expect(spy.calls.count()).toEqual(1);
        expect(response).toEqual(Post.create(whistleService, expectedResponse));
      });
    }
  )));

  it('should has getReplies method which return Promise<Post[]>', async(inject(
    [WhistleService, SteemService],
    (whistleService: WhistleService, steemService: SteemService) => {
      let rawPosts: ISteemPost[] = [
        {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
          active_votes: [],
        },
        {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
          active_votes: [],
        },
        {
          author: 'author2',
          permlink: 'permlink-3',
          title: 'title-3',
          body: 'body3',
          active_votes: [],
        }
      ];

      let expectedResponse = [
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
          active_votes: [],
        }),
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
          active_votes: [],
        }),
        Post.create(whistleService, {
          author: 'author2',
          permlink: 'permlink-3',
          title: 'title-3',
          body: 'body3',
          active_votes: [],
        })
      ];

      let spy = spyOn(steemService.api, 'getContentReplies').and.returnValue(Promise.resolve(rawPosts));

      whistleService.getReplies('author', 'permlink').then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(expectedResponse);
      });
    }
  )));

  it('should has getVotes method which return Promise<Vote[]>', async(inject(
    [WhistleService, SteemService],
    (whistleService: WhistleService, steemService: SteemService) => {
      let rawVotes: ISteemVote[] = [
        {
          percent: 10000,
          reputation: '1234567',
          rshares: '1234567',
          time: '2017-03-21T17:53:48',
          voter: 'noisy',
          weight: '1234567',
        },
        {
          percent: 8000,
          reputation: '1234567',
          rshares: '1234567',
          time: '2017-03-21T18:53:48',
          voter: 'noisy2',
          weight: '1234567',
        },
      ];

      let expectedResponse: Vote[] = [
        {
          percent: 10000,
          reputation: '1234567',
          rshares: '1234567',
          time: '2017-03-21T17:53:48',
          voter: 'noisy',
          weight: '1234567',
        },
        {
          percent: 8000,
          reputation: '1234567',
          rshares: '1234567',
          time: '2017-03-21T18:53:48',
          voter: 'noisy2',
          weight: '1234567',
        },
      ];

      let spy = spyOn(steemService.api, 'getActiveVotes').and.returnValue(Promise.resolve(rawVotes));

      whistleService.getVotes('author', 'permlink').then((votes: Vote[]) => {
        expect(spy.calls.count()).toEqual(1);
        expect(votes).toEqual(expectedResponse);
      });
    }
  )));
});
