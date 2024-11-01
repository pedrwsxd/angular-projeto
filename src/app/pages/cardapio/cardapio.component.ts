import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../models/produto';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  produtos: Produto[] = []; // Array para armazenar os produtos
  quantidades: { [produtoId: number]: number } = {};

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Buscar produtos diretamente usando o método listar() do ProdutoService
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        produtos.forEach(produto => {
          this.quantidades[produto.id] = 1;
        });
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        Swal.fire({
          title: 'Erro ao carregar o cardápio',
          text: 'Não foi possível carregar os produtos. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    const quantidade = this.quantidades[produto.id];
    if (quantidade > 0) {
      this.cartService.adicionarAoCarrinho(produto, quantidade);
      this.presentAlert(quantidade, produto.nome);
    } else {
      Swal.fire({
        title: `A quantidade deve ser maior que 0.`,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  goToCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  presentAlert(quantidade: any, nome: any) {
    Swal.fire({
      title: `${quantidade} ${nome} foi adicionado ao carrinho!`,
      icon: 'success',
      confirmButtonText: 'Confirmar'
    });
  }
}
