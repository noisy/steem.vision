import { TestBed, async, inject } from '@angular/core/testing';

import { WhistleService } from './whistle.service';
import { SteemService} from './steem.service';
import { Post } from './post';

describe('WhistleService', () => {

  class SteemServiceStub {
    api = {
      getContent: () => {},
    };
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        WhistleService,
        { provide: SteemService, useClass: SteemServiceStub}
      ]
    })
      .compileComponents();
  }));

  it('should be injectable', inject([WhistleService], (whistleService: WhistleService) => {
    expect(whistleService).toBeDefined();
  }));

  it('should has getPost method which return Promise<Post>', async(inject(
    [WhistleService, SteemService],
    (whistleService: WhistleService, steemService: SteemService) => {

      let expectedResponse = {
        author: 'noisy',
        permlink: 'harry-potter-7',
        title: 'Review of Harry Potter Deathly Hallows',
        body: 'Review ...'
      };

      let spy = spyOn(steemService.api, 'getContent').and.returnValue(Promise.resolve(expectedResponse));

      whistleService.getPost('noisy', 'permlink').then((response) => {
        expect(spy.calls.count()).toEqual(1);
        expect(response).toEqual(new Post(whistleService, expectedResponse));
      });
    }
  )));

});
