import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTournamentComponent } from './past-tournament.component';

describe('PastTournamentComponent', () => {
  let component: PastTournamentComponent;
  let fixture: ComponentFixture<PastTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
