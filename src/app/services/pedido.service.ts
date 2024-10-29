import { AuthService } from './auth.service';
// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Pedido, PedidoDTO } from '../models/pedido';
import { ItemPedido } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listarMeusPedidos(): Observable<PedidoDTO[]> {
    const usuarioId = this.authService.obterIdDoUsuario();
    const token = this.authService.obterToken(); // Método que retorna o token JWT
  
    if (usuarioId && token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<PedidoDTO[]>(`${this.apiUrl}/usuario/${usuarioId}`, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
  }

  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/listar`);
  }

  criarPedido(
    clienteId: number,
    itensPedido: ItemPedido[], // Atualizado para receber itensPedido
    options?: { headers: HttpHeaders }
  ): Observable<Pedido> {
    const pedidoData = {
      cliente: clienteId,
      itensPedido: itensPedido, // Atualizado para enviar itensPedido
    };
    return this.http.post<Pedido>(
      `${this.apiUrl}/novopedido`,
      pedidoData,
      options
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocorreu um erro:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend retornou código ${error.status},   
 ` +
          `corpo da mensagem: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Algo deu errado, tente novamente mais tarde.')   

    );
  }
}