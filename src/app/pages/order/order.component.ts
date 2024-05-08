import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/orders/order.service';
import { IOrder } from '../../Interfaces/IOrder';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, CommonModule, NgxMaskPipe],
  providers: [provideNgxMask()],
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

  order?: IOrder;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.orderService.getOrderById(parseInt(id)).subscribe(order => {
        this.order = order;
      })
    }

    history.pushState(null, '', document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, '', document.URL);
    });
  }

  orderFinalized() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
