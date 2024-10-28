import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
 // Importe o AuthService
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  
  const router = inject(Router);
  

   if (authService.isAuthenticated()) { 
    return true;
  } else {

    const returnUrl = state.url; 

    router.navigate(['/login'], { queryParams: { returnUrl } }); 
    return false;
  }
};
