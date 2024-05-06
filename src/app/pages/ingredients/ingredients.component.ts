import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IIngredients } from '../../Interfaces/IIngredients';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../../services/ingredients/ingredient.service';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent implements OnInit {
  ingredients: IIngredients[] = [];
  filter!: IIngredients[];

  private ingredientService = inject(IngredientService);

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.filter = ingredients;
    })
  }

  deleteIngredient(ingredient: IIngredients) {
    this.ingredientService.deleteIngredient(ingredient.id).subscribe(() => {
      this.loadIngredients();
      this.toastr.success('Ingredient deleted!');
    })
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.ingredients = this.filter.filter((ingredient) =>  {
      return ingredient.name?.toUpperCase().includes(target.value.toUpperCase()) || ingredient.description?.toUpperCase().includes(target.value.toUpperCase());
    });
  }
}
