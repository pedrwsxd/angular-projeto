import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { produto: Produto; quantidade: number }[] = []; // Carrinho de compras

  constructor() {}

  adicionarAoCarrinho(produto: Produto, quantidade: number): void {
    console.log('Produto adicionado:', produto.nome, 'Quantidade:', quantidade);
    // Verifica se o produto já está no carrinho
    const itemExistente = this.cart.find(
      (item) => item.produto.id === produto.id
    );
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.cart.push({ produto, quantidade });
    }
  }

  // Método para obter os itens do carrinho, se precisar
  obterCarrinho() {
    return this.cart;
  }

  // Método para limpar o carrinho, se necessário
  limparCarrinho() {
    this.cart = [];
  }

  getCarrinho() {
    return this.cart; // Retorna os itens no carrinho
  }

  removerDoCarrinho(produto: Produto): void {
    this.cart = this.cart.filter((item) => item.produto.id !== produto.id);
  }
}
