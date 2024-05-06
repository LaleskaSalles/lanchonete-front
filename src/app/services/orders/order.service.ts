import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IOrder } from '../../Interfaces/IOrder';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  apiurl = 'http://localhost:8080/order';

  constructor(
    private fb: FormBuilder
  ) {}

  getAllOrders() {
    return this.http.get<IOrder[]>(`${this.apiurl}`)
  }

  getOrder(id:number) {
    return this.http.get<IOrder>(`${this.apiurl}/${id}`)
  }

  createOrder(order: any) {
    return this.http.post<IOrder>(`${this.apiurl}`, order)
  }

  addItemToForm(item: any, form: FormGroup): void {
    if (this.isHamburger(item)) {
      for (let i = 0; i < item.quantity; i++) {
        this.addHamburgerToForm(item, form);
      }
    } else if (this.isDrink(item)) {
      for (let i = 0; i < item.quantity; i++) {
        this.addDrinkToForm(item, form);
      }
    } else {
      for (let i = 0; i < item.quantity; i++) {
        this.addIngredientToForm(item, form);
      }
    }
  }

  private addHamburgerToForm(hamburger: any, form: FormGroup): void {
    const formattedId = hamburger.id.replace('HAMBURGER-', ''); 
    const hamburgerGroup = this.fb.group({
      id: formattedId,
      name: hamburger.name,
      description: hamburger.description,
      price: hamburger.price
    });
    (form.get('hamburgers') as FormArray).push(hamburgerGroup);
  }

  private addDrinkToForm(drink: any, form: FormGroup): void {
    const formattedId = drink.id.replace('DRINK-', '');
    const drinkGroup = this.fb.group({
      id: formattedId,
      name: drink.name,
      description: drink.description,
      price: drink.price,
      flag_sugar: drink.flag_sugar
    });
    (form.get('drinks') as FormArray).push(drinkGroup);
  }

  private addIngredientToForm(ingredient: any, form: FormGroup): void {
    const formattedId = ingredient.id.replace('INGREDIENT-', '');
    const ingredientGroup = this.fb.group({
      id: formattedId,
      name: ingredient.name,
      description: ingredient.description,
      price: ingredient.price,
      flag_additional: ingredient.flag_additional
    });
    (form.get('ingredients') as FormArray).push(ingredientGroup);
  }

  isHamburger(item: any): boolean {
    return item.id.startsWith('HAMBURGER');
  }

  isDrink(item: any): boolean {
    return item.id.startsWith('DRINK');
  }

  isIngredient(item: any): boolean {
    return item.id.startsWith('INGREDIENT');
  }



}


