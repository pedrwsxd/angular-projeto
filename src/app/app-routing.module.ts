import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './pages/contato/contato.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { LoginAdmComponent } from './pages/admin/login-adm/login-adm.component';
import { CardapioAdmComponent } from './pages/admin/cardapio-adm/cardapio-adm.component';


const routes: Routes = [
  { path: 'contato', component: ContatoComponent,  canActivate: [authGuard]},
  { path: 'carrinho', component: CartComponent, canActivate: [authGuard] },
  { path: 'sobre', component: SobreComponent},
  { path: 'cardapio', component: CardapioComponent},
  { path: 'login', component: LoginComponent, },
  { path: 'admin', component: LoginAdmComponent},
  { path: 'admin/produtos/listar', component: CardapioAdmComponent, canActivate: [authGuard]},
  { path: '', component: InicioComponent},
  {path: '**', redirectTo: ''} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
