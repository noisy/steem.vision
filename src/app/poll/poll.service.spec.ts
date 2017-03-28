import { TestBed, async, inject } from '@angular/core/testing';
import { PollService } from './poll.service';
import { WhistleService } from '../whistle/whistle.service';
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

  //
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
  //
  //     let expectedResponse = {
  //       author: 'noisy',
  //       permlink: 'harry-potter-7',
  //       title: 'Review of Harry Potter Deathly Hallows',
  //       body: 'Review ...'
  //     };
  //

  //
  //     whistleService.getPost('noisy', 'permlink').then((response) => {
  //       expect(spy.calls.count()).toEqual(1);
  //       expect(response).toEqual(new Post(whistleService, expectedResponse));
  //     });
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

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(response));

      pollService.fetchOptions(post).then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(response);
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
        expect(posts).toEqual([response[0], response[1]]);
      });
    }
  )));

});
