import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  carrinho: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.carrinho = this.cartService.getCarrinho();
  }

  removerItem(produto: Produto): void {
    this.cartService.removerDoCarrinho(produto);
    this.carrinho = this.cartService.getCarrinho(); // Atualiza o carrinho
  }

  calcularTotal(): number {
    return this.carrinho.reduce(
      (acc, item) => acc + item.produto.preco * item.quantidade,
      0
    );
  }

  finalizarCompra(): void {
    // Aqui você pode redirecionar para a página de finalização
    // Ou exibir uma mensagem de confirmação
    alert('Pedido finalizado com sucesso!');
  }
}
