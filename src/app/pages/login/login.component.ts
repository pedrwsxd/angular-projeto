import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public returnUrl: string = '/';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
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
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
        }
      );
    }
  }

  navigate() {
    this.router.navigate(["signup"]);
  }
}
