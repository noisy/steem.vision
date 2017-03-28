import { TestBed, async, inject } from '@angular/core/testing';

import { Post } from '../whistle/post';
import { Poll } from './poll';
import { WhistleService } from '../whistle/whistle.service';

describe('Poll', () => {

  class WhistleServiceStub {
    getPost = () => {};
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [

        { provide: WhistleService, useClass: WhistleServiceStub}
      ]
    })
      .compileComponents();
  }));

  // it('should has getPolls method', async(inject(
  //   [WhistleService],
  //   (whistleService: WhistleService) => {
  //
  //     let post = new Post(whistleService, {
  //       author: 'author',
  //       permlink: 'permlink',
  //       title: 'title',
  //       body: 'body',
  //     });
  //
  //   }
  // )));
  //
  // it('can be constructed from Post and its comments', () => {
  //
  //   class WhistleServiceStub {
  //     test = 'test';
  //   }
  //
  //
  //
  // });

});
