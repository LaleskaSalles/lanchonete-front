import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/orders/order.service';
import { IOrder } from '../../../Interfaces/IOrder';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  order? : IOrder;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.orderService.getOrderById(parseInt(id)).subscribe(order => {
      this.order = order;
      })
    }
  }

  orderFinalized() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}