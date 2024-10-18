import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service'; // Importando o serviço de produtos
import { CartService } from '../services/cart.service'; // Importando o serviço do carrinho
import { Produto } from '../models/produto'; // Modelo de produto
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  produtos: Produto[] = []; // Lista de produtos
  quantidades: { [produtoId: number]: number } = {}; // Mapeia produtoId para a quantidade

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtendo os produtos ao inicializar o componente
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      // Inicializando as quantidades para cada produto com valor padrão de 1
      this.produtos.forEach((produto) => {
        this.quantidades[produto.id] = 0;
      });
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    const quantidade = this.quantidades[produto.id]; // Obtém a quantidade do produto
    if (quantidade > 0) {
      this.cartService.adicionarAoCarrinho(produto, quantidade);
      alert(
        `${quantidade} unidade(s) de ${produto.nome} foi adicionado(a) ao carrinho!`
      );

      //alert(`${quantidade} ${produto.nome} adicionado ao carrinho!`);
    } else {
      alert('A quantidade deve ser maior que 0.');
    }
  }

  goToCarrinho() {
    this.router.navigate(['/carrinho']); // Redireciona para a página do carrinho
  }
}
