import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service'; // Importando o serviço de produtos
import { CartService } from '../services/cart.service'; // Importando o serviço do carrinho
import { Produto } from '../models/produto'; // Modelo de produto
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class CardapioComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  produtos: Produto[] = []; // Lista de produtos

  constructor(private produtoService: ProdutoService, private cartService: CartService) { }

  ngOnInit() {
    this.getProdutos(); // Obtém os produtos ao inicializar o componente
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos; // Atribui os produtos recebidos à variável
    });
  }

  addToCart(produto: Produto) {
    this.cartService.addToCart(produto); // Adiciona o produto ao carrinho
  }
}