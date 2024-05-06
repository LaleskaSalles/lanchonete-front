import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../../services/ingredients/ingredient.service';
import { IIngredients } from '../../Interfaces/IIngredients';

@Component({
  selector: 'app-ingredients-forms',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './ingredients-forms.component.html',
  styleUrl: './ingredients-forms.component.css'
})
export class IngredientsFormsComponent implements OnInit {

  constructor(
    private ingredientsService: IngredientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){}

  ingredientForm?: FormGroup
  ingredient?: IIngredients

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.ingredientsService.getIngredient(parseInt(id)).subscribe(ingredient => {
        this.ingredient = ingredient;
        this.ingredientForm = this.fb.group({
          name: [ingredient.name, [Validators.required]],
          price: [ingredient.price, [Validators.required, Validators.min(0.1)]],
          description: [ingredient.description],
          flag_additional: [ingredient.flag_additional, [Validators.required]]
        })
      })
    } else {
      this.ingredientForm = this.fb.group({
        name: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0.1)]],
        description: [''],
        flag_additional: ['NOT_ADDITIONAL', [Validators.required]]
      })
    }
  }

  saveIngredient() {
    const form = this.ingredientForm!.value;
    
    if (this.ingredient && this.ingredientForm?.valid) {
      this.ingredientsService.updateIngredient(this.ingredient.id, form).subscribe(() => {
        this.router.navigate(['/ingredients']);
        this.toastr.success('Ingredient updated!');
      })

    } else if (this.ingredientForm?.valid) {
      this.ingredientsService.createIngredient(form).subscribe(() => {
        this.router.navigate(['/ingredients']);
        this.toastr.success('Ingredient created!');
      })
    } else {
      this.ingredientForm?.markAllAsTouched();
      this.toastr.error('Please fill in all required fields!');
    }
  }

}
