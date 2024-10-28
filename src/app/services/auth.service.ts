import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {jwtDecode} from "jwt-decode"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth/login'; 
  private readonly tokenKey = 'token'; 
  authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; senha: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      email: credentials.email,
      senha: credentials.senha
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  salvarToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token); 
  }

  obterToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('token');
    } else {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null; 
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);
  }

  getUserRoles(): string[] {
    const token = this.obterToken();
    if (!token) return [];
    
    try {
      const decodedToken: any = jwtDecode(token); 
      return decodedToken.roles || []; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error); 
      return [];
    }
  }

  obterIdDoUsuario(): number | null {
    const token = this.obterToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id || null;
    } catch (error) {
      console.error('Erro ao decodificar o token para obter o ID do usuário:', error);
      return null;
    }
  }

  isAdminAsync(): Observable<boolean> {
    const token = this.obterToken();
    if (!token) return of(false);

    try {
      const decodedToken: any = jwtDecode(token);
      return of(decodedToken.roles.includes('ROLE_ADMIN'));
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return of(false);
    }
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ROLE_ADMIN'); 
  }

  isClient(): boolean {
    return this.getUserRoles().includes('ROLE_CLIENTE'); 
  }

  isAuthenticated(): boolean {
    return !!this.obterToken(); 
  }
}
