import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCreatComponent } from './tournament-creat.component';

describe('TournamentCreatComponent', () => {
  let component: TournamentCreatComponent;
  let fixture: ComponentFixture<TournamentCreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
