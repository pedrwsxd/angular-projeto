import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Produto[] = [];

  constructor() {}

  addToCart(produto: Produto) {
    this.items.push(produto);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}