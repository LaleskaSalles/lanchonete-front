import { Routes } from '@angular/router';
import { DrinkComponent } from './pages/drink/drink.component';
import { DrinkFormsComponent } from './pages/drink-forms/drink-forms.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { IngredientsFormsComponent } from './pages/ingredients-forms/ingredients-forms.component';

export const routes: Routes = [
    {
        path: 'drinks',
        component: DrinkComponent
    },
    {
        path: 'drinks/add',
        component: DrinkFormsComponent
    },
    {
        path: 'drinks/edit/:id',
        component: DrinkFormsComponent
    },
    {
        path: 'ingredients',
        component: IngredientsComponent
    },
    {
        path: 'ingredients/add',
        component: IngredientsFormsComponent
    },
    {
        path: 'ingredients/edit/:id',
        component: IngredientsFormsComponent
    }
];
