import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const clientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserRoles().includes('ROLE_CLIENTE')) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
