import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTournamentPartitionComponent } from './user-tournament-partition.component';

describe('UserTournamentPartitionComponent', () => {
  let component: UserTournamentPartitionComponent;
  let fixture: ComponentFixture<UserTournamentPartitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTournamentPartitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTournamentPartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
