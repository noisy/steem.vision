import { TestBed, async, inject } from '@angular/core/testing';
import { PollService } from './poll.service';
import { WhistleService } from '../whistle/whistle.service';
import { Poll } from './poll';
import { PollOption } from './polloption';
import { Post } from '../whistle/post';

describe('PollService', () => {

  class WhistleServiceStub {
    getPost = () => {};
    getReplies = () => {};
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        PollService,
        { provide: WhistleService, useClass: WhistleServiceStub}
      ]
    }).compileComponents();
  }));

  it('should be injectable', inject([PollService], (pollService: PollService) => {
    expect(pollService).toBeDefined();
  }));

  it('should has getPoll method', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

      let expectedResponse = {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
      };

      let spy = spyOn(whistleService, 'getPost').and.returnValue(Promise.resolve(expectedResponse));

      pollService.getPoll('author', 'permlink').then(poll => {
        expect(poll).toEqual(new Poll(new Post(whistleService, expectedResponse)));
      });
    }
  )));

  xit('should has getPolls method', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

        let expectedResponse = {
          author: 'author',
          permlink: 'permlink',
          title: 'title',
          body: 'body',
        };

        let spy = spyOn(whistleService, 'getPost').and.returnValue(Promise.resolve(expectedResponse));

        pollService.getPolls().then(polls => {
          // half ready
          expect(1).toBe(2);
        });
    }
  )));

  it('should has fetchOptions', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

      let post = new Post(whistleService, {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
      });

      let response = [
        new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
        }),
        new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
        }),
      ];

      let expectedResponse = [
        new PollOption(new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
        })),
        new PollOption(new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
        })),
      ];

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(response));

      pollService.fetchOptions(post).then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(expectedResponse);
      });
    }
  )));

  it('fetchOptions fetch only options of the same author as post', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

      let post = new Post(whistleService, {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
      });

      let response = [
        new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
        }),
        new Post(whistleService, {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
        }),
        new Post(whistleService, {
          author: 'author2',
          permlink: 'permlink-3',
          title: 'title-3',
          body: 'body3',
        })
      ];

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(response));

      pollService.fetchOptions(post).then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual([new PollOption(response[0]), new PollOption(response[1])]);
      });
    }
  )));

});
