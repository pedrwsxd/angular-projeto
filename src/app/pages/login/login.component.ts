import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    credentials = {
      email: '',
      senha: ''
    };
  
    constructor(
      private authService: AuthService, // Injete o AuthService
      private router: Router
    ) { }
  
    login() {
      console.log(this.credentials);
      this.authService.login(this.credentials).subscribe(
        (response: any) => {
          console.log(response)
          sessionStorage.setItem('name', response[0].name)
          sessionStorage.setItem('token',response[0].token)
          
          
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          // Exiba uma mensagem de erro para o usuário
        }
      );
    }

}
