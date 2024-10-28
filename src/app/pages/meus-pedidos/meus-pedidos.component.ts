// src/app/pages/meus-pedidos/meus-pedidos.component.ts
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDTO } from '../../models/pedido';


@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css'],
})
export class MeusPedidosComponent implements OnInit {
  pedidos: PedidoDTO[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.listarMeusPedidos().subscribe( 
      (pedidos) => {
        this.pedidos = pedidos;
      },
      (error) => { 
        console.error('Erro ao buscar pedidos:', error);
      }
    );
  }
}
