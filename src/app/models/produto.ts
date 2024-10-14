export interface Produto {
    id: number;
    nome: string;
    preco: number;
    tipo: string;
    sabor: string;
    ativo: boolean; // Ou pode ser 'number' caso você use 0 ou 1
  }