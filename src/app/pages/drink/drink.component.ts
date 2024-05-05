import { Component, OnInit, inject } from '@angular/core';
import { DrinkService } from '../../services/drinks/drink.service';
import { RouterModule } from '@angular/router';
import { IDrink } from '../Interfaces/IDrink';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent implements OnInit {

  isModelOpen = false;
  drinks: IDrink[] = [];
  private drinkService = inject(DrinkService);

  ngOnInit(): void {
    this.loadDrinks();
  }

  loadDrinks() {
    this.drinkService.getAllDrinks().subscribe(drinks => {
      this.drinks = drinks;
    });
  }

  deleteDrink(drinks: IDrink) {
    this.drinkService.deleteDrink(drinks.id).subscribe(() => {
      this.loadDrinks();
    })
  }
}
