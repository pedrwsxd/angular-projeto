import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): Observable<boolean> {
    return this.authService.isAdminAsync().pipe(
      map(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['unauthorized']); // Redireciona caso não seja admin
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['unauthorized']);
        return of(false);
      })
    );
  }
}