// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/listar`);
  }

  criarPedido(clienteId: number, produtosIds: number[], total: number, options?: { headers: HttpHeaders }): Observable<Pedido> { // Adicionar options
    const pedidoData = {
      cliente: clienteId,
      produtos: produtosIds,
      total: total
    };
    return this.http.post<Pedido>(`${this.apiUrl}/novopedido`, pedidoData, options); // Passar options para o post()
  }
}
