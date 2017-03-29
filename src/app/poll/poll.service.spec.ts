import { TestBed, async, inject } from '@angular/core/testing';
import { PollService } from './poll.service';
import { WhistleService } from '../whistle/whistle.service';
import { Poll } from './poll';
import { Post } from '../whistle/post';
import { PollOption } from './polloption';
import { PollConfig } from './pollconfig';

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
        active_votes: [],
        json_metadata: '{"poll_config": {"adding_choices_allowed": true}}',
      });
      let expectedResponse: Poll = Poll.createPoll(pollService, post);

      let spy = spyOn(whistleService, 'getPost').and.returnValue(Promise.resolve(expectedResponse));

      pollService.getPoll('author', 'permlink').then(poll => {
        expect(poll).toEqual(expectedResponse);
      });
    }
  )));

  it('should has getChoices method', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

      let config: PollConfig = {
        addingChoicesAllowed: true
      };

      let whistleResponse: Post[] = [
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-option-1',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
        Post.create(whistleService, {
          author: 'author2',
          permlink: 'permlink-option-2',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
      ];

      let expectedResponse: PollOption[] = [
        new PollOption(whistleResponse[0]),
        new PollOption(whistleResponse[1]),
      ];

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(whistleResponse));

      pollService.getChoices('author', 'permlink', config).then((choices: PollOption[]) => {
        expect(choices).toEqual(expectedResponse);
      });
    }
  )));

  it('getChoices filter choices by respecting config.addingChoicesAllowed setting', async(inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {

      let config: PollConfig = {
        addingChoicesAllowed: false
      };

      let whistleResponse: Post[] = [
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-option-1',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
        Post.create(whistleService, {
          author: 'author2',
          permlink: 'permlink-option-2',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
        Post.create(whistleService, {
          author: 'author2',
          permlink: 'permlink-option-3',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
        Post.create(whistleService, {
          author: 'author',
          permlink: 'permlink-option-4',
          title: 'title',
          body: 'body',
          active_votes: [],
          json_metadata: '{}',
        }),
      ];

      let expectedResponse: PollOption[] = [
        new PollOption(whistleResponse[0]),
        new PollOption(whistleResponse[3]),
      ];

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(expectedResponse));

      pollService.getChoices('author', 'permlink', config).then((choices: PollOption[]) => {
        expect(choices).toEqual(expectedResponse);
      });
    }
  )));

  xit('getChoices mark Poll as not ready if there is no available choices', () => {});

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
