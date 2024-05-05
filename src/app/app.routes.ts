import { Routes } from '@angular/router';
import { DrinkComponent } from './pages/drink/drink.component';
import { DrinkFormsComponent } from './pages/drink-forms/drink-forms.component';

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
    }
];
