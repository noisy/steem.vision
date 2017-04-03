import { PollComponent } from './poll.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { AmChartsService } from 'amcharts3-angular2';

import { PollService } from '../poll/poll.service';
import { WhistleService } from '../whistle/whistle.service';


describe('PollComponent', function () {
  let de: DebugElement;
  let comp: PollComponent;
  let fixture: ComponentFixture<PollComponent>;
  let pollService: PollService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollComponent ],
      providers: [
        PollService,
        { provide: WhistleService, useValue: {}},
        { provide: AmChartsService, useValue: {}},
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                author: 'luke',
                permlink: 'force'
              })
            }
          }
        },
      ]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    comp = fixture.componentInstance;

    pollService = fixture.debugElement.injector.get(PollService);
    spy = spyOn(pollService, 'getPolls').and.returnValue(Promise.resolve([]));

    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  // it('should have expected <h1> text', () => {
  //   fixture.detectChanges();
  //   const h1 = de.nativeElement;
  //   expect(h1.innerText).toContain('test');
  // });
});
