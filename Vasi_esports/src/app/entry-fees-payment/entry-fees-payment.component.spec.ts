import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFeesPaymentComponent } from './entry-fees-payment.component';

describe('EntryFeesPaymentComponent', () => {
  let component: EntryFeesPaymentComponent;
  let fixture: ComponentFixture<EntryFeesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryFeesPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFeesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
