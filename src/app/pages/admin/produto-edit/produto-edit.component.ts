import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {
  
  faCheck = faCheck;
  faXmark = faXmark;

  produtoForm!: FormGroup;
  produtoId!: number; // ID do produto a ser editado

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);


    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Produto ID:', this.produtoId); // Log para verificar o ID

    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      imagemUrl: ['', Validators.required],
      preco: [0, Validators.required],
      tipo: ['', Validators.required],
      sabor: ['', Validators.required],
      quantidade: [0, Validators.required],
      ativo: [true]
    });

    // Carregar os dados do produto
    this.produtoService.listarPorId(this.produtoId).subscribe(
      produto => {
        if (produto) {
          console.log('Produto carregado:', produto); // Log para verificar os dados do produto
          this.produtoForm.patchValue(produto); // Preencher o formulário com os dados do produto
        } else {
          console.error('Produto não encontrado');
        }
      },
      error => {
        console.error('Erro ao carregar o produto:', error);
      }
    );
  }

  // Função para atualizar o produto
  atualizarProduto(): void {
    if (this.produtoForm.valid) {
      const produtoAtualizado: Produto = {
        id: this.produtoId,
        ...this.produtoForm.value
      };

      // Chama o método do serviço para editar o produto
      this.produtoService.atualizar(produtoAtualizado).subscribe(
        () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/admin/gerenciar/produtos']); // Navegar de volta para a lista de produtos
        },
        error => {
          console.error('Erro ao atualizar o produto:', error);
          alert('Erro ao atualizar o produto.');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/admin/gerenciar/produtos']); // Navegar de volta sem salvar alterações
  }
}