import { Produto } from './produto';

export interface Pedido {
  id?: number; 
  produtos: { produto: Produto; quantidade: number }[];
  metodoPagamento: string;
  total: number;
}

export interface PedidoDTO {
  id: number;
  status: string;
  dataPedido: Date;
  clienteNome: string; 
  produtosNomes: string[];
  total: number;
}

