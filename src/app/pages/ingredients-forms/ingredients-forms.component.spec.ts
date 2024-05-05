import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsFormsComponent } from './ingredients-forms.component';

describe('IngredientsFormsComponent', () => {
  let component: IngredientsFormsComponent;
  let fixture: ComponentFixture<IngredientsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
