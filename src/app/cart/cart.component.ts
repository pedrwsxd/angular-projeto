import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; // Serviço de carrinho
import { Produto } from '../models/produto'; // Modelo de produto
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carrinho: { produto: Produto; quantidade: number }[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.carrinho = this.cartService.obterCarrinho();
  }

  removerDoCarrinho(produto: Produto) {
    this.cartService.removerDoCarrinho(produto);
    this.carrinho = this.cartService.obterCarrinho(); // Atualiza a lista de produtos no carrinho
  }

  calcularTotal(): number {
    return this.carrinho.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  }

  finalizarCompra() {
    if (this.carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    // Aqui você pode implementar o envio do pedido
    alert('Compra finalizada com sucesso!');

    // Depois de finalizar a compra, limpa o carrinho
    this.cartService.limparCarrinho();

    // Redireciona para uma página de confirmação ou para o início
    this.router.navigate(['/']);
  }


  
}
