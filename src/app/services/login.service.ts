import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "https://api-foodtruck.pedrohenrick.com.br:8080/auth";

  constructor(private httpClient: HttpClient) { }

  private handleLoginResponse(response: LoginResponse) {
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("nome", response.nome);

    if (response.roles) {
      sessionStorage.setItem("roles", JSON.stringify(response.roles));
    }
  }
    
  

  
  login(email: string, senha: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(this.handleLoginResponse)
    );
  }

  signup(nome: string, telefone: string, email: string, senha: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, { nome, telefone, email, senha }).pipe(
      tap(this.handleLoginResponse)
    );
  }

  obterRoles(): string[] | null {
    const roles = sessionStorage.getItem("roles");
    return roles ? JSON.parse(roles) : null;
  }
}
