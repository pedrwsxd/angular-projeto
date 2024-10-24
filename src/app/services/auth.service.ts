import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth/login'; // URL do endpoint de login
  private localStorageKey = 'token';

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
    sessionStorage.setItem('token', token); // Salva no sessionStorage
  }

  obterToken(): string | null {
    return sessionStorage.getItem('token'); // Obtém do sessionStorage
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Remove do sessionStorage
  }

  isAuthenticated(): boolean {
    // Verifica se o token existe no armazenamento (sessionStorage ou localStorage)
    const token = sessionStorage.getItem('token');
    return !!token; // Retorna true se o token existir, caso contrário false
  }
}
