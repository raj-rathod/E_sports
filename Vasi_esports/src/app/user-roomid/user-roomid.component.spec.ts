import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoomidComponent } from './user-roomid.component';

describe('UserRoomidComponent', () => {
  let component: UserRoomidComponent;
  let fixture: ComponentFixture<UserRoomidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoomidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoomidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
