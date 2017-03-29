import { DashboardComponent } from './dashboard.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { PollService } from '../poll/poll.service';
import { WhistleService } from '../whistle/whistle.service';
import { RouterLinkStubDirective } from '../testing/router-stubs';


describe('DashbordComponent', function () {
  let de: DebugElement;
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let pollService: PollService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        RouterLinkStubDirective
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        PollService,
        { provide: WhistleService, useValue: {}},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    pollService = fixture.debugElement.injector.get(PollService);
    spy = spyOn(pollService, 'getPolls').and.returnValue(Promise.resolve([]));

    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h1> Polls', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toContain('Polls');
  });
});
