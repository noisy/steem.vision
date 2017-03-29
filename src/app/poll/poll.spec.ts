import { TestBed, async, inject } from '@angular/core/testing';

import { Poll } from './poll';
import { WhistleService } from '../whistle/whistle.service';
import { PollOption } from './polloption';
import { PollService } from './poll.service';

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

  // it('should has getChoices method', async(inject(
  //   [WhistleService, PollServiceStub],
  //   (whistleService: WhistleService, pollService: PollService) => {
  //
  //     let poll: Poll = new Poll({
  //       whistleService: whistleService,
  //       author: 'author',
  //       permlink: 'permlink',
  //       title: 'title',
  //       body: 'body',
  //       active_votes: [],
  //     });
  //
  //     let expectedResponse: PollOption[] = [
  //     ];
  //
  //     let spy = spyOn(pollService, 'getChoices').and.returnValue(Promise.resolve(expectedResponse));
  //
  //     poll.getChoices().then((choices: PollOption[]) => {
  //       expect(choices).toEqual(expectedResponse);
  //     });
  //
  //   }
  // )));


  // it('can be constructed from Post and its comments', () => {
  //
  //   class WhistleServiceStub {
  //     test = 'test';
  //   }
  // });

});
