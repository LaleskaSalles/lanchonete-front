import { Component, OnInit, inject } from '@angular/core';
import { IOrder } from '../../Interfaces/IOrder';
import { IIngredients } from '../../Interfaces/IIngredients';
import { IDrink } from '../../Interfaces/IDrink';
import { IHamburger } from '../../Interfaces/IHamburger';
import { OrderService } from '../../services/orders/order.service';
import { ToastrService } from 'ngx-toastr';
import { HamburgerService } from '../../services/hamburgers/hamburger.service';
import { DrinkService } from '../../services/drinks/drink.service';
import { IngredientService } from '../../services/ingredients/ingredient.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CartComponent, NavbarComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit{
  orders: IOrder[] = [];
  filterIngredients!: IIngredients[];
  filterDrinks!: IDrink[];
  filterHamburgers!: IHamburger[];
  ingredients: IIngredients[] = [];
  drinks: IDrink[] = [];
  hamburgers: IHamburger[] = [];
  cartService = inject(CartService);
  
  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private ingredientService: IngredientService,
    private drinkService: DrinkService,
    private hamburgerService: HamburgerService
  ) { }

  removeFromCart(item: any) {
    this.cartService.delete(item);
  }

  addToCart(product: any, type: string) {
    this.cartService.addToCart(product, type);
    this.toastr.success('Item added to cart', 'Success');
  }


  loadItens() {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    })
    this.hamburgerService.getAllHamburgers().subscribe(hamburgers => {
      this.hamburgers = hamburgers;
      this.filterHamburgers = hamburgers;
    })

    this.drinkService.getAllDrinks().subscribe(drinks => {
      this.drinks = drinks;
      this.filterDrinks = drinks;
    })

    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients.filter(ingredient => ingredient.flag_additional === 'ADDITIONAL');
      this.filterIngredients = ingredients;
    })
  }

  ngOnInit(): void {
    this.loadItens();
  }

  search(e: Event) {

    const target = e.target as HTMLInputElement;
    this.ingredients = this.filterIngredients.filter((ingredient) =>  {
      return ingredient.name?.toUpperCase().includes(target.value.toUpperCase());
    })
    this.drinks = this.filterDrinks.filter((drink) =>  {
      return drink.name?.toUpperCase().includes(target.value.toUpperCase());
    })
    this.hamburgers = this.filterHamburgers.filter((hamburger) =>  {
      return hamburger.name?.toUpperCase().includes(target.value.toUpperCase());
    })
  }

}
