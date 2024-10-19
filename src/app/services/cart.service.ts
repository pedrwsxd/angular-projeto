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

  // Adicionar ao carrinho
  adicionarAoCarrinho(produto: Produto, quantidade: number): void {
    const itemExistente = this.cart.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.cart.push({ produto, quantidade });
    }
    this.salvarCarrinho(); // Salva o carrinho sempre que há mudanças
  }

  // Obter carrinho
  obterCarrinho(): { produto: Produto; quantidade: number }[] {
    return this.cart;
  }

  // Remover do carrinho
  removerDoCarrinho(produto: Produto): void {
    this.cart = this.cart.filter(item => item.produto.id !== produto.id);
    this.salvarCarrinho();
  }

  // Limpar carrinho
  limparCarrinho(): void {
    this.cart = [];
    this.salvarCarrinho();
  }

  // Salvar carrinho no sessionStorage
  private salvarCarrinho(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('carrinho', JSON.stringify(this.cart));
    }
  }

  // Carregar carrinho do sessionStorage
  private carregarCarrinho(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const carrinhoSalvo = window.sessionStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        this.cart = JSON.parse(carrinhoSalvo);
      }
    }
  }
}
