import { Component } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrl: './produto-add.component.css'
})
export class ProdutoAddComponent {
  produto: Produto = {
    id: 0,
    imagemUrl: '',
    nome: '',
    sabor: '',
    tipo: '',
    preco: 0,
    quantidade: 0,
    ativo: true
  };

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  salvarProduto() {
    this.produtoService.adicionarProduto(this.produto).subscribe(() => {
      this.router.navigate(['admin/gerenciar/produtos']);
    });
  }

  cancelar() {
    this.router.navigate(['admin/gerenciar/produtos']);
  }
}
