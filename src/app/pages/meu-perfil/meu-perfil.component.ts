import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  usuario: any = {}; // Armazena as informações do usuário
  erroCarregamento = false; // Para exibir mensagem de erro, se necessário

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService // Injeção do AuthService
  ) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    const userId = this.authService.obterIdDoUsuario(); // Obtém o ID do usuário logado
    if (userId) {
      this.usuarioService.listarPorId(userId).subscribe(
        (dados: any) => {
          this.usuario = dados; // Atribui as informações do usuário
        },
        (error) => {
          console.error("Erro ao carregar usuário:", error);
          this.erroCarregamento = true; // Sinaliza erro no carregamento
        }
      );
    } else {
      console.error("ID do usuário não encontrado no token.");
      this.erroCarregamento = true;
    }
  }
}