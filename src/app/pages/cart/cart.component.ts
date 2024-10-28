// src/app/pages/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../models/produto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carrinho: { produto: Produto; quantidade: number }[] = [];
  metodoPagamento: string = 'dinheiro';

  constructor(
    private cartService: CartService,
    private router: Router,
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carrinho = this.cartService.obterCarrinho();
  }

  removerDoCarrinho(produto: Produto) {
    this.cartService.removerDoCarrinho(produto);
    this.carrinho = this.cartService.obterCarrinho();
  }

  calcularTotal(): number {
    return this.carrinho.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  }

  async finalizarCompra() {
    // ... (código anterior) ...
  
    const clienteId = this.authService.obterIdDoUsuario();
    const token = this.authService.obterToken(); // Obter o token de autenticação
  
    if (clienteId === null || token === null) {
      await this.presentAlert('Não foi possível identificar o cliente ou obter o token de autenticação.');
      return;
    }
  
    const produtosIds = this.carrinho.map(item => item.produto.id);
    const total = this.calcularTotal();
  
    const headers = new HttpHeaders({ // Criar o objeto HttpHeaders
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adicionar o token no cabeçalho
    });
  
    this.pedidoService.criarPedido(clienteId, produtosIds, total, { headers: headers }).subscribe(
      () => {
        Swal.fire('Compra finalizada com sucesso!', '', 'success');
        this.cartService.limparCarrinho();
        this.router.navigate(['/meus-pedidos']);
      },
      (error) => {
        console.error('Erro ao criar pedido:', error);
        // Tratar o erro, exibir mensagem para o usuário, etc.
      }
    );
  }

  presentAlert(message: string) {
    return Swal.fire({
      title: 'Atenção',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  presentConfirmacao(message: string): Promise<boolean> {
    return Swal.fire({
      title: 'Confirmação',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => result.isConfirmed);
  }
}
