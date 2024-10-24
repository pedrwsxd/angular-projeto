import { Component, OnInit } from '@angular/core';
import { ProdutoAdmService } from '../../../services/admin/produto-adm.service';

@Component({
  selector: 'app-cardapio-adm',
  templateUrl: './cardapio-adm.component.html',
  styleUrl: './cardapio-adm.component.css'
})
export class CardapioAdmComponent implements OnInit{
  
  
  produtos: any[] = []; //Aluno é um array sem formatação 
  constructor(private produtoAdmService: ProdutoAdmService) { }

  ngOnInit() {
    this.listarProduto();
  }
  
  listarProduto(){
    this.produtoAdmService.listar().subscribe((data) =>{
      this.produtos = data;
      console.log(this.produtos);
    })
  }

  excluirProduto(id: number){
    this.produtoAdmService.excluir(id).subscribe(() => {
      this.listarProduto();
    })
  }

}
