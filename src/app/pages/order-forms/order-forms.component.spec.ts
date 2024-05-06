import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormsComponent } from './order-forms.component';

describe('OrderFormsComponent', () => {
  let component: OrderFormsComponent;
  let fixture: ComponentFixture<OrderFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
