import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkFormsComponent } from './drink-forms.component';

describe('DrinkFormsComponent', () => {
  let component: DrinkFormsComponent;
  let fixture: ComponentFixture<DrinkFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrinkFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
