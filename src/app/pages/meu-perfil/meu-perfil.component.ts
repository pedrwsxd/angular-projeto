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
}