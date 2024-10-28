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

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listarMeusPedidos(): Observable<PedidoDTO[]> {
    const usuarioId = this.authService.obterIdDoUsuario(); // Obtenha o ID do usuário do AuthService
    if (usuarioId) {
      return this.http.get<PedidoDTO[]>(`${this.apiUrl}/usuario/${usuarioId}`)
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
    produtosIds: number[],
    total: number,
    options?: { headers: HttpHeaders }
  ): Observable<Pedido> {
    
    const pedidoData = {
      cliente: clienteId,
      produtos: produtosIds,
      total: total,
    };
    return this.http.post<Pedido>(
      `${this.apiUrl}/novopedido`,
      pedidoData,
      options
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      
      console.error('Ocorreu um erro:', error.error);
    } else {
      
      console.error(
        `Backend retornou código ${error.status}, ` +
          `corpo da mensagem: ${error.error}`
      );
    }
    
    return throwError(
      () => new Error('Algo deu errado, tente novamente mais tarde.')
    );
  }
}
