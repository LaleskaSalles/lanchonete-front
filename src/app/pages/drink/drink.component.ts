import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../services/drinks/drink.service';
import { RouterModule } from '@angular/router';
import { IDrink } from '../../Interfaces/IDrink';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent implements OnInit {

  drinks: IDrink[] = [];
  filter!: IDrink[];

  constructor(
    private toastr: ToastrService,
    private drinkService: DrinkService
  ) { }

  ngOnInit(): void {
    this.loadDrinks();
  }

  loadDrinks() {
    this.drinkService.getAllDrinks().subscribe(drinks => {
      this.drinks = drinks;
      this.filter = drinks;
    });
  }

  deleteDrink(drinks: IDrink) {
    this.drinkService.deleteDrink(drinks.id).subscribe(() => {
      this.loadDrinks();
      this.toastr.success('Drink deleted!');
    })
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.drinks = this.filter.filter((drink) => {
      return drink.name?.toUpperCase().includes(target.value.toUpperCase()) || drink.description?.toUpperCase().includes(target.value.toUpperCase());
    });
  }
}
