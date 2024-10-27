import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {jwtDecode} from "jwt-decode"; // Importação correta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth/login'; // URL do endpoint de login
  private readonly tokenKey = 'token'; // Chave de armazenamento do token no sessionStorage
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
    sessionStorage.setItem(this.tokenKey, token); // Salva o token no sessionStorage
  }

  obterToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('token');
    } else {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null; // Verifica se o token existe no armazenamento
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);
  }

  getUserRoles(): string[] {
    const token = this.obterToken();
    if (!token) return [];
    
    try {
      const decodedToken: any = jwtDecode(token); // Decodifica o token
      return decodedToken.roles || []; // Retorna os roles se existirem
    } catch (error) {
      console.error('Erro ao decodificar o token:', error); // Tratamento de erro ao decodificar o token
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
    return this.getUserRoles().includes('ROLE_ADMIN'); // Verifica se o usuário tem o role de admin
  }

  isClient(): boolean {
    return this.getUserRoles().includes('ROLE_CLIENTE'); // Verifica se o usuário tem o role de cliente
  }

  isAuthenticated(): boolean {
    return !!this.obterToken(); // Verifica se o token está presente e válido
  }
}
