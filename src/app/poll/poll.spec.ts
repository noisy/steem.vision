import { TestBed, async, inject } from '@angular/core/testing';

import { Poll } from './poll';
import { WhistleService } from '../whistle/whistle.service';
import { PollOption } from './polloption';
import { PollService } from './poll.service';
import { Post } from '../whistle/post';

describe('Poll', () => {

  class WhistleServiceStub {
    getPost = () => {};
    getReplies = () => {};
  }

  class PollServiceStub {
    getChoices = () => {};
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: WhistleService, useClass: WhistleServiceStub},
        { provide: PollService, useClass: PollServiceStub}
      ]
    }).compileComponents();
  }));

  it('should has getChoices method', async(inject(
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
      let poll = Poll.createPoll(pollService, post);

      let expectedResponse: PollOption[] = [];

      let spy = spyOn(pollService, 'getChoices').and.returnValue(Promise.resolve(expectedResponse));

      poll.getChoices().then((choices: PollOption[]) => {
        expect(choices).toEqual(expectedResponse);
      });
    }
  )));

  it('has pollConfig loaded from json_metadata', inject(
    [WhistleService, PollService],
    (whistleService: WhistleService, pollService: PollService) => {
      let post: Post = Post.create(whistleService, {
        author: 'author',
        permlink: 'permlink',
        title: 'title',
        body: 'body',
        active_votes: [],
        json_metadata: '{"poll_config": {"adding_choices_allowed": true}}',
      });
      let poll = Poll.createPoll(pollService, post);
      expect(poll.config).toEqual({addingChoicesAllowed: true});
  }));
});
