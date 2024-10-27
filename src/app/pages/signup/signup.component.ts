import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  nome: FormControl<string | null>;
  email: FormControl<string | null>;
  senha: FormControl<string | null>;
  senhaConfirm: FormControl<string | null>;
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // corrigido aqui
})
export class SignupComponent {
  signupForm: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      senhaConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.signupForm.valid) {
      const nome = this.signupForm.value.nome ?? '';
      const email = this.signupForm.value.email ?? '';
      const senha = this.signupForm.value.senha ?? '';
      const senhaConfirm = this.signupForm.value.senhaConfirm ?? '';
      
      if (senha !== senhaConfirm) {
        this.toastr.error('As senhas não coincidem.');
        return;
      }
  
      this.loginService.signup(nome, email, senha).subscribe({
        next: () => {
          this.toastr.success('Cadastro realizado com sucesso!');
          this.navigate();
        },
        error: () => this.toastr.error('Erro ao realizar o cadastro.')
      });
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.');
    }
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
