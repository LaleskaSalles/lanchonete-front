import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerFormsComponent } from './hamburger-forms.component';

describe('HamburgerFormsComponent', () => {
  let component: HamburgerFormsComponent;
  let fixture: ComponentFixture<HamburgerFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HamburgerFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
