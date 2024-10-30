import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCrown, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  isMenuOpen = false;

toggleMobileMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
  isAdmin: boolean = false;
  exibirIconeCarrinho: boolean = false;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faCrown = faCrown;
  menuVisible: string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events.subscribe(() => {
      this.exibirIconeCarrinho = this.router.url === '/cardapio';
    });
  }

  ngOnInit() {

    this.isAdmin = this.authService.isAdmin();
    // Verifica o estado de autenticação no início
    this.isLoggedIn = this.authService.isAuthenticated();

    // Escuta mudanças de login caso seu serviço emita eventos
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  goToContato(){
    window.location.href = '/contato';
  }

  goToSobre(){
    window.location.href = '/sobre';
  }

  goToCardapio() {
    window.location.href = '/cardapio';
  }
  goToCarrinho() {
    this.router.navigate(['/carrinho']); 
  }

  navigateToAdminPage(): void {
    this.router.navigate(['/admin/gerenciar/produtos']);
  }
}
