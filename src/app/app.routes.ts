import { Routes } from '@angular/router';
import { DrinkComponent } from './pages/drink/drink.component';
import { DrinkFormsComponent } from './pages/drink-forms/drink-forms.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { IngredientsFormsComponent } from './pages/ingredients-forms/ingredients-forms.component';
import { HamburgerComponent } from './pages/hamburger/hamburger.component';
import { HamburgerFormsComponent } from './pages/hamburger-forms/hamburger-forms.component';

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
    },
    {
        path: 'hamburgers',
        component: HamburgerComponent
    },
    {
        path: 'hamburgers/add',
        component: HamburgerFormsComponent
    },
    {
        path: 'hamburgers/edit/:id',
        component: HamburgerFormsComponent
    }

];
