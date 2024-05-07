import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../Interfaces/IOrder';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/orders/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-order-forms',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './order-forms.component.html',
  styleUrl: './order-forms.component.css'
})
export class OrderFormsComponent implements OnInit {

  orderForm?: FormGroup;
  order?: IOrder;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const cartItems = this.cartService.getItems();

    this.orderForm = this.fb.group({
      customer_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      complement: [''],
      number: [''],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      ingredients: this.fb.array([]),
      hamburgers: this.fb.array([]),
      drinks: this.fb.array([]),
      total_price: this.cartService.getTotal()
    })
    cartItems.forEach(item => {
      this.orderService.addItemToForm(item, this.orderForm!);
    });
  }

  get itemsFormArray() {
    console.log(this.orderForm?.get('items'));
    return this.orderForm?.get('items') as FormArray
  }

  saveOrder() {
    const form = this.orderForm!.value;
    console.log(form);
    if (this.orderForm?.valid) {
      this.orderService.createOrder(form).subscribe((response) => {
        const responseId = response.id;
        this.router.navigate(['/order', responseId]);
        this.toastr.success('Order created!');
      })
    } else {
      this.orderForm?.markAllAsTouched();
      this.toastr.error('Please fill in all required fields!');
    }
  }


  
}
