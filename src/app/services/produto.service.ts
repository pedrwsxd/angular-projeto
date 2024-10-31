import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Produto } from '../models/produto';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly apiUrl = 'http://api-foodtruck.pedrohenrick.com.br:8080/produtos';
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.buscarProdutos();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  buscarProdutos(): void {
    this.http.get<Produto[]>(`${this.apiUrl}/listar`)
      .pipe(
        tap(produtos => this.produtosSubject.next(produtos)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  private hasRoleAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    console.log("Token:", token);
    if (!token) {
      console.log("Token não encontrado no sessionStorage."); 
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return false;
    }
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    if (!this.hasRoleAdmin()) {
      return throwError(() => new Error('Acesso negado: Apenas administradores podem adicionar produtos.'));
    }

    return this.http.post<Produto>(`${this.apiUrl}/add`, produto, { headers: this.getAuthHeaders() }).pipe(
      tap(novoProduto => {
        const produtos = [...this.produtosSubject.value, novoProduto];
        this.produtosSubject.next(produtos);
      }),
      catchError(this.handleError)
    );
  }

  editarProduto(produtoId: number, produto: Produto): Observable<Produto> {
    if (!this.hasRoleAdmin()) {
      return throwError(() => new Error('Acesso negado: Apenas administradores podem editar produtos.'));
    }

    return this.http.put<Produto>(`${this.apiUrl}/atualizar/${produtoId}`, produto, { headers: this.getAuthHeaders() })
    .pipe(
      tap(produtoEditado => {
        const produtos = this.produtosSubject.value.map(p => p.id === produtoId ? produtoEditado : p);
        this.produtosSubject.next(produtos);
      }),
      catchError(this.handleError)
    );
  }

  deletarProduto(produtoId: number): Observable<void> {
    if (!this.hasRoleAdmin()) {
      return throwError(() => new Error('Acesso negado: Apenas administradores podem deletar produtos.'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${produtoId}`, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        const produtos = this.produtosSubject.value.filter(p => p.id !== produtoId);
        this.produtosSubject.next(produtos);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    
    if (error.error && typeof error.error === 'object') {
      errorMessage = `Erro do cliente: ${error.error.message || 'Mensagem não disponível'}`;
    } else {
      errorMessage = `Erro do servidor: ${error.status}, Mensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
