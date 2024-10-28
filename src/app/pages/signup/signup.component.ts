import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AlertController } from '@ionic/angular';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface SignupForm {
  nome: FormControl<string | null>;
  telefone: FormControl<string | null>;
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertController: AlertController // Adicionando AlertController no construtor
  ) {
    this.signupForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      senhaConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async presentAlert(message: string, type: 'success' | 'error') {
    const alert = await this.alertController.create({
      header: type === 'success' ? 'Sucesso' : 'Erro',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  submit() {
    if (this.signupForm.valid) {
      const nome = this.signupForm.value.nome ?? '';
      const telefone = this.signupForm.value.telefone ?? '';
      const email = this.signupForm.value.email ?? '';
      const senha = this.signupForm.value.senha ?? '';
      const senhaConfirm = this.signupForm.value.senhaConfirm ?? '';
  
      if (senha !== senhaConfirm) {
        this.presentAlert('As senhas não coincidem.', 'error');
        return;
      }
  
      this.loginService.signup(nome, telefone, email, senha).subscribe({
        next: () => {
          this.presentAlert('Cadastro realizado com sucesso!', 'success');
          this.navigate();
        },
        error: () => this.presentAlert('Erro ao realizar o cadastro.', 'error'),
      });
    } else {
      this.presentAlert('Por favor, preencha todos os campos corretamente.', 'error');
    }
  }

  navigate(){
    this.router.navigate(['/login']);
  }
}
