import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedPlayerComponent } from './verified-player.component';

describe('VerifiedPlayerComponent', () => {
  let component: VerifiedPlayerComponent;
  let fixture: ComponentFixture<VerifiedPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
