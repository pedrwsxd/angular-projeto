import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-adm',
  templateUrl: './login-adm.component.html',
  styleUrl: './login-adm.component.css'
})
export class LoginAdmComponent {
  loginForm!: FormGroup;
  public goAdm: string = '/admin/gerenciar';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.goAdm = params['goAdm'] || '/admin/gerenciar';
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.loginService.login(email, senha).subscribe(
        () => {
          this.router.navigate([this.goAdm]);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
        }
      );
    }
  }

}
