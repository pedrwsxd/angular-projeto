import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  private handleLoginResponse(response: LoginResponse) {
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("nome", response.nome);
  }

  login(email: string, senha: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(this.handleLoginResponse)
    );
  }

  signup(nome: string, email: string, senha: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, { nome, email, senha }).pipe(
      tap(this.handleLoginResponse)
    );
  }
}
