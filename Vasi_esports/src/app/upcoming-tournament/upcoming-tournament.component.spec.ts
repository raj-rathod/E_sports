import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTournamentComponent } from './upcoming-tournament.component';

describe('UpcomingTournamentComponent', () => {
  let component: UpcomingTournamentComponent;
  let fixture: ComponentFixture<UpcomingTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
