import { Routes } from '@angular/router';
import { DrinkComponent } from './pages/drink/drink.component';
import { DrinkFormsComponent } from './pages/drink-forms/drink-forms.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { IngredientsFormsComponent } from './pages/ingredients-forms/ingredients-forms.component';
import { HamburgerComponent } from './pages/hamburger/hamburger.component';
import { HamburgerFormsComponent } from './pages/hamburger-forms/hamburger-forms.component';
import { CartComponent } from './pages/cart/cart.component';
import { ListComponent } from './pages/list/list.component';
import { OrderFormsComponent } from './pages/order-forms/order-forms.component';
import { OrderComponent } from './pages/order/order.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'drinks',component: DrinkComponent, canActivate: [authGuard] },
    { path: 'drinks/add',component: DrinkFormsComponent, canActivate: [authGuard] },
    { path: 'drinks/edit/:id',component: DrinkFormsComponent, canActivate: [authGuard] },

    { path: 'ingredients', component: IngredientsComponent, canActivate: [authGuard] },
    { path: 'ingredients/add', component: IngredientsFormsComponent, canActivate: [authGuard] },
    { path: 'ingredients/edit/:id', component: IngredientsFormsComponent, canActivate: [authGuard] },

    { path: 'hamburgers', component: HamburgerComponent, canActivate: [authGuard] },
    { path: 'hamburgers/add', component: HamburgerFormsComponent, canActivate: [authGuard]},
    { path: 'hamburgers/edit/:id', component: HamburgerFormsComponent, canActivate: [authGuard] },

    { path: '', component: ListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderFormsComponent},
    { path: 'order/:id', component: OrderComponent },

    {path: 'login', component: LoginComponent}


];

