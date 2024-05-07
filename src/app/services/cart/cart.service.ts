import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  private items : any[] = []

  constructor(@Inject(DOCUMENT) private document: Document) {
    const cartItems = localStorage.getItem('cartItems');
    this.items = cartItems ? JSON.parse(cartItems) : [];
  }

  addToCart(product : any, type: string) {
    const item = this.items.find((i) => i.id === `${type}-${product.id}`);
  if (item) {
    item.quantity++;
  } else {
    this.items.push({ ...product, id: `${type}-${product.id}`, quantity: 1 });
  }
  localStorage.setItem('cartItems', JSON.stringify(this.items));
}

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  delete(item: any){
    this.items = this.items.filter((i) => i.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  incrementQuantity(id: number) {
   let item = this.items.find((i) => i.id === id);
   if(item) {
    item.quantity++;
   }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  decrementQuantity(id: number) {
    let item = this.items.find((i) => i.id === id);
    if(item) {
     item.quantity--;
     if(item.quantity === 0){
      this.delete(item);
     }
    } 
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getTotal() {
    return this.items.reduce((a, item) => {
      return a + item.price * item.quantity
    }, 0);
  }
}
