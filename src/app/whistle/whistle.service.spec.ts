import { TestBed, async, inject } from '@angular/core/testing';

import { WhistleService } from './whistle.service';
import { SteemService} from './steem.service';
import { Post } from './post';

describe('WhistleService', () => {

  class SteemServiceStub {
    api = {
      getContent: () => {},
      getContentReplies: () => {},
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
        expect(response).toEqual(Post.create(whistleService, expectedResponse));
      });
    }
  )));


  it('should has getReplies method which return Promise<Post[]>', async(inject(
    [WhistleService, SteemService],
    (whistleService: WhistleService, steemService: SteemService) => {
      let rawPosts = [
        {
          author: 'author',
          permlink: 'permlink-1',
          title: 'title-1',
          body: 'body1',
        },
        {
          author: 'author',
          permlink: 'permlink-2',
          title: 'title-2',
          body: 'body2',
        },
        {
          author: 'author2',
          permlink: 'permlink-3',
          title: 'title-3',
          body: 'body3',
        }
      ];

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

      let spy = spyOn(steemService.api, 'getContentReplies').and.returnValue(Promise.resolve(rawPosts));

      whistleService.getReplies('author', 'permlink').then((posts) => {
        expect(spy.calls.count()).toEqual(1);
        expect(posts).toEqual(expectedResponse);
      });
    }
  )));

});
