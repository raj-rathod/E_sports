import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPlayerComponent } from './registered-player.component';

describe('RegisteredPlayerComponent', () => {
  let component: RegisteredPlayerComponent;
  let fixture: ComponentFixture<RegisteredPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
