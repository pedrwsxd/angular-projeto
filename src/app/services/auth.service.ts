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
    localStorage.setItem(this.localStorageKey, token);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
