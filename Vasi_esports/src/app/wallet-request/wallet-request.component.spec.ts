import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRequestComponent } from './wallet-request.component';

describe('WalletRequestComponent', () => {
  let component: WalletRequestComponent;
  let fixture: ComponentFixture<WalletRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
