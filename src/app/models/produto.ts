export interface Produto {
  quantidade: number;
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  sabor: string;
  ativo: boolean;
  imagemUrl: string; 
}

export interface ItemPedido{
  idProduto: number;
  quantidade: number;
}