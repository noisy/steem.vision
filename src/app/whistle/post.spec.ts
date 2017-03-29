import { TestBed, async, inject } from '@angular/core/testing';

import { WhistleService } from './whistle.service';
import { Post } from './post';
import { Vote } from './vote';

describe('Post', () => {

  class WhistleServiceStub {
    getReplies = () => {};
    getVotes = () => {};
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: WhistleService, useClass: WhistleServiceStub}
        // { provide: SteemService, useClass: SteemServiceStub}
      ]
    }).compileComponents();
  }));

  it('should has getReplies method which return Promise<Post[]>', async(inject(
    [WhistleService],
    (whistleService: WhistleService) => {

      let post = Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink',
          title: 'title',
          body: 'body',
        });

      let expectedResponse = [
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
        }),
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
        }),
        Post.create(whistleService, {
          author: 'author2',
          permlink: 'permlink-3',
          title: 'title-3',
          body: 'body3',
        })
      ];

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(expectedResponse));

      post.getReplies().then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(expectedResponse);
      });

    }
  )));

  it('should has getVotes method which return Promise<Vote[]>', async(inject(
    [WhistleService],
    (whistleService: WhistleService) => {

      let post = Post.create(whistleService, {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
      });

      let response: Vote[] = [
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

      let spy = spyOn(whistleService, 'getVotes').and.returnValue(Promise.resolve(response));

      post.getVotes().then((votes: Vote[]) => {
        expect(spy.calls.count()).toEqual(1);
        expect(votes).toEqual(response);
      });
    }
  )));

});
