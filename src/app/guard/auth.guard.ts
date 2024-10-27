import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
 // Importe o AuthService
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Injeta o serviço de autenticação
  const router = inject(Router);
  
   // Verifica se o usuário está autenticado
   if (authService.isAuthenticated()) { // Nome do método corrigido
    return true;
  } else {
    // Armazena a URL atual (opcional)
    const returnUrl = state.url; 
    // Redireciona para a página de login
    router.navigate(['/login'], { queryParams: { returnUrl } }); 
    return false;
  }
};
