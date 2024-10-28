import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { produto: Produto; quantidade: number }[] = []; // Carrinho de compras

  constructor() {
    this.carregarCarrinho();
  }

  
  adicionarAoCarrinho(produto: Produto, quantidade: number): void {
    const itemExistente = this.cart.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.cart.push({ produto, quantidade });
    }
    this.salvarCarrinho(); 
  }


  obterCarrinho(): { produto: Produto; quantidade: number }[] {
    return this.cart;
  }

 
  removerDoCarrinho(produto: Produto): void {
    this.cart = this.cart.filter(item => item.produto.id !== produto.id);
    this.salvarCarrinho();
  }

 
  limparCarrinho(): void {
    this.cart = [];
    this.salvarCarrinho();
  }

  
  private salvarCarrinho(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('carrinho', JSON.stringify(this.cart));
    }
  }

  
  private carregarCarrinho(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const carrinhoSalvo = window.sessionStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        this.cart = JSON.parse(carrinhoSalvo);
      }
    }
  }
}
