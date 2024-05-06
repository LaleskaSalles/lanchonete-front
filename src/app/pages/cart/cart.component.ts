import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  removeFromCart(item: any) {
    this.cartService.delete(item);
  }

  finalizeOrder() {
    const hasHamburger = this.cartService.getItems().some(item => item.quantity > 0);
    if (!hasHamburger) {
      this.toastr.error('You must add a any to finish the order!');
      return;
    }
    this.router.navigate(['/order']);
  }
}
