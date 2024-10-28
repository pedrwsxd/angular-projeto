import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../models/produto';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  
  produtos$: Observable<Produto[]>; 
  quantidades: { [produtoId: number]: number } = {};

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService,
    private router: Router
  ) { 
    this.produtos$ = this.produtoService.produtos$; 
  }

  ngOnInit() {
    this.produtos$.subscribe(produtos => {
      produtos.forEach(produto => {
        this.quantidades[produto.id] = 1;
      });
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    const quantidade = this.quantidades[produto.id];
    if (quantidade > 0) {
      this.cartService.adicionarAoCarrinho(produto, quantidade);

      this.presentAlert(quantidade, produto.nome)
    } else {
      alert('A quantidade deve ser maior que 0.');
    }
  }

  goToCarrinho() {
    this.router.navigate(['/carrinho']);
  }


  presentAlert(quantidade: any, nome: any){
    Swal.fire({
      title: `${quantidade} ${nome} foi adicionado ao carrinho!`,
      icon: 'success',
      confirmButtonText: 'Confirmar'
    })
  }
}