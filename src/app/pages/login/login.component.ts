import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    credentials = {
      email: '',
      senha: ''
    };
    public returnUrl: string = '/'; 
  
    constructor(
      private authService: AuthService, // Injete o AuthService
      private router: Router,
      private route: ActivatedRoute
    ) { }

    ngOnInit() { // Use o método ngOnInit
      this.route.queryParams.subscribe(params => {
        this.returnUrl = params['returnUrl'] || '/'; // Define a URL de retorno
      });
    }
  
    login() {
      console.log(this.credentials);
      this.authService.login(this.credentials).subscribe(
        (response: any) => {
          console.log(response);
          
          // Verifique se 'response' tem os dados de nome e token corretamente
          if (response && response.nome && response.token) {
            sessionStorage.setItem('nome', response.nome);
            sessionStorage.setItem('token', response.token);

            this.router.navigate([this.returnUrl]); 

            
          } else {
            console.error('Resposta do login inválida:', response);
            // Exiba uma mensagem de erro apropriada
          }
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          // Exiba uma mensagem de erro para o usuário
        }
      );
    }

}
