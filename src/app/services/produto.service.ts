import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Produto } from '../models/produto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly apiUrl = 'https://api-foodtruck.pedrohenrick.com.br/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listar`).pipe(
      catchError(this.handleError)
    );
  }

  listarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/listar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  adicionar(produto: Produto): Observable<Produto> {
    const headers = this.getAuthHeaders();
    return this.http.post<Produto>(`${this.apiUrl}/add`, produto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(produto: Produto): Observable<Produto> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/atualizar/${produto.id}`;
    return this.http.put<Produto>(url, produto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  excluir(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'Erro desconhecido!';
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
