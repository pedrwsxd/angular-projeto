import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly apiUrl = 'http://localhost:8080/produtos/listar';
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.http.get<Produto[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error)),
        tap(produtos => this.produtosSubject.next(produtos))
      )
      .subscribe();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor: ${error.status}, ` + `Mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}