import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HamburgerService } from '../../services/hamburgers/hamburger.service';
import { ToastrService } from 'ngx-toastr';
import { IHamburger } from '../../Interfaces/IHamburger';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IIngredients } from '../../Interfaces/IIngredients';
import { IngredientService } from '../../services/ingredients/ingredient.service';

@Component({
  selector: 'app-hamburger-forms',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './hamburger-forms.component.html',
  styleUrl: './hamburger-forms.component.css'
})
export class HamburgerFormsComponent implements OnInit {

  hamburgerForm?: FormGroup;
  hamburger?: IHamburger;
  ingredients: IIngredients[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private hamburgerService: HamburgerService,
    private ingredientService: IngredientService,
    private toastr: ToastrService
  ) { }

  loadIngredients() {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.hamburgerService.getHamburger(parseInt(id)).subscribe(hamburger => {
        this.hamburger = hamburger;
        this.loadIngredients();
        this.hamburgerForm = this.fb.group({
          name: [hamburger.name, [Validators.required]],
          description: [hamburger.description],
          price: [hamburger.price, [Validators.required, Validators.min(0.1)]],
          ingredients: [hamburger.ingredients ? hamburger.ingredients.map(ingredient => ingredient.id) : [], [Validators.required]]
        })
      })
    } else {
      this.loadIngredients();
      this.hamburgerForm = this.fb.group({
        name: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required, Validators.min(0.1)]],
        ingredients: [[], [Validators.required]],
      })
    }
  }

  saveHamburger() {
    const form = this.hamburgerForm!.value;
    if (this.hamburger && this.hamburgerForm?.valid) {
      this.hamburgerService.updateHamburger(this.hamburger.id, form).subscribe(() => {
        this.router.navigate(['/hamburgers']);
        this.toastr.success('Hamburger updated!');
      });
    } else if (this.hamburgerForm?.valid) {
      this.hamburgerService.createHamburger(form).subscribe(() => {
        this.router.navigate(['/hamburgers']);
        this.toastr.success('Hamburger created!');
      });
    } else {
      this.hamburgerForm?.markAllAsTouched();
      this.toastr.error('Please fill in all required fields');
    }
  }

  isDescriptionTooLong() {
    const descriptionControl = this.hamburgerForm?.get('description');
    return descriptionControl?.value.length > 100;
  }
}
