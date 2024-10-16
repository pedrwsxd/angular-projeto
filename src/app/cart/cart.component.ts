import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Produto[] = [];
  produtos: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    window.alert('Carrinho limpo!');
  }
}