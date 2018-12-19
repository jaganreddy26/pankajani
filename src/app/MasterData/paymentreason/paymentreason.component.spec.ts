import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreasonComponent } from './paymentreason.component';

describe('PaymentreasonComponent', () => {
  let component: PaymentreasonComponent;
  let fixture: ComponentFixture<PaymentreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
