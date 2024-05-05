import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router, RouterModule } from '@angular/router';
import { DrinkService } from '../../services/drinks/drink.service';
import { IDrink } from '../Interfaces/IDrink';

@Component({
  selector: 'app-drink-forms',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './drink-forms.component.html',
  styleUrl: './drink-forms.component.css'
})
export class DrinkFormsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private drinkService = inject(DrinkService);

  drinkForm?: FormGroup;
  drink?: IDrink;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.drinkService.getDrink(parseInt(id)).subscribe(drink => {
        this.drink = drink;
        this.drinkForm = this.fb.group({
          name: [drink.name, [Validators.required]],
          description: [drink.description],
          price: [drink.price, [Validators.required, Validators.min(0.1)]],
          flag_sugar: [drink.flag_sugar, [Validators.required]]
        })
      })
    } else {
      this.drinkForm = this.fb.group({
        name: ['', [Validators.required]],
        description: [''],
        price: [null, [Validators.required, Validators.min(0.1)]],
        flag_sugar: ['WITH_SUGAR', [Validators.required]]
      })
    }
  }



  saveDrink() {
    const form = this.drinkForm!.value;

    if (this.drink) {
      this.drinkService.updateDrink(this.drink.id, form).subscribe(() => {
        this.router.navigate(['/drinks']);
      });

    } else {
      this.drinkService.createDrink(form).subscribe(() => {
        this.router.navigate(['/drinks']);
      })
    }
  }


}
