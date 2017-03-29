import { TestBed, async, inject } from '@angular/core/testing';
import { PollService } from './poll.service';
import { WhistleService } from '../whistle/whistle.service';
import { Poll } from './poll';
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

      let post = Post.create(whistleService, {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
        active_votes: []
      });
      let expectedResponse: Poll = Poll.createPoll(pollService, post);

      let spy = spyOn(whistleService, 'getPost').and.returnValue(Promise.resolve(Post.create(whistleService, expectedResponse)));

      pollService.getPoll('author', 'permlink').then(poll => {
        expect(poll).toEqual(expectedResponse);
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
});
