import { Produto } from './produto';

export interface Pedido {
  id?: number; 
  produtos: { produto: Produto; quantidade: number }[];
  metodoPagamento: string;
  total: number;
}
