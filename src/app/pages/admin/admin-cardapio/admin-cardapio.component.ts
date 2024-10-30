import { Component } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-cardapio',
  templateUrl: './admin-cardapio.component.html',
  styleUrl: './admin-cardapio.component.css'
})
export class AdminCardapioComponent {
  faPlus = faPlus;

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.produtos$.subscribe(
      produtos => this.produtos = produtos
    );
  }

  adicionarProduto() {
    this.router.navigate(['admin/gerenciar/produtos/cadastrar']);
  }

  editarProduto(id: number) {
    this.router.navigate(['admin/gerenciar/produtos/editar', id]);
  }

  deletarProduto(id: number) {
    
    this.presentAlert(id);

 }

 presentAlert(id: any){
  Swal.fire({
    title: 'Tem certeza?',
    text: `O produto com id: ${id} será excluído do cardápio.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.produtoService.deletarProduto(id).subscribe(() => {
        this.carregarProdutos();
        Swal.fire('Excluído!', 'O produto foi excluído.', 'success');
      });
    }
  });
 }
}
