import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTournamentComponent } from './registration-tournament.component';

describe('RegistrationTournamentComponent', () => {
  let component: RegistrationTournamentComponent;
  let fixture: ComponentFixture<RegistrationTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
