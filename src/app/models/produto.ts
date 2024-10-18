export interface Produto {
  quantidade: number;
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  sabor: string;
  ativo: boolean;
  imagemUrl: string; // Ou pode ser 'number' caso você use 0 ou 1
}
