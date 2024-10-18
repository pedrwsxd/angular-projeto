import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  exibirIconeCarrinho: boolean = false;
  faShoppingCart = faShoppingCart;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.exibirIconeCarrinho = this.router.url === '/cardapio';
    });
  }
  goToCardapio() {
    window.location.href = '/cardapio';
  }
  goToCarrinho() {
    this.router.navigate(['/carrinho']); // Usar o Router para navegação
  }
}
