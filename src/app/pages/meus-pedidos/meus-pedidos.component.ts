// src/app/pages/meus-pedidos/meus-pedidos.component.ts
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.listarPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }
}
