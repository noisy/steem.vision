import { TestBed, async, inject } from '@angular/core/testing';

import { WhistleService } from './whistle.service';
import { Post } from './post';

describe('Post', () => {

  class WhistleServiceStub {
    getReplies = () => {};
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

      let post = new Post(whistleService, {
          author: 'author',
          permlink: 'permlink',
          title: 'title',
          body: 'body',
        });

      let expectedResponse = [
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

      let spy = spyOn(whistleService, 'getReplies').and.returnValue(Promise.resolve(expectedResponse));

      post.getReplies().then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(expectedResponse);
      });

    }
  )));

});
