import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  usuario: any = {};  
  editando = false;
  erroCarregamento = false;  

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService  
  ) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    const userId = this.authService.obterIdDoUsuario(); 
    if (userId) {
      this.usuarioService.listarPorId(userId).subscribe(
        (dados: any) => {
          this.usuario = dados; 
        },
        (error) => {
          console.error("Erro ao carregar usuário:", error);
          this.erroCarregamento = true; 
        }
      );
    } else {
      console.error("ID do usuário não encontrado no token.");
      this.erroCarregamento = true;
    }
  }

  editarUsuario() {
    this.editando = true; 
  }

  salvarUsuario() {
    // Criar um novo objeto com apenas os campos editáveis
    const usuarioAtualizado = {
      id: this.usuario.id,
      nome: this.usuario.nome,
      email: this.usuario.email,
      telefone: this.usuario.telefone
    };

    this.usuarioService.atualizar(usuarioAtualizado).subscribe(
      (dados: any) => {
        this.editando = false;
        this.carregarUsuario();
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário. Verifique se você tem permissão ou tente novamente mais tarde.');
      }
    );
  }

  cancelarEdicao() {
    this.editando = false;
    this.carregarUsuario();
  }
}