import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentVerificationComponent } from './tournament-verification.component';

describe('TournamentVerificationComponent', () => {
  let component: TournamentVerificationComponent;
  let fixture: ComponentFixture<TournamentVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
