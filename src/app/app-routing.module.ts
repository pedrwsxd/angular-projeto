import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './pages/contato/contato.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';

import { AdminCardapioComponent } from './pages/admin/admin-cardapio/admin-cardapio.component';
import { ProdutoAddComponent } from './pages/admin/produto-add/produto-add.component';

import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { SignupComponent } from './pages/signup/signup.component';
import { adminGuard } from './guard/admin.guard';
import { authGuard } from './guard/auth.guard';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';



const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'contato', component: ContatoComponent,  canActivate: [authGuard]},
  { path: 'carrinho', component: CartComponent, canActivate: [authGuard] },
  { path: 'sobre', component: SobreComponent},
  { path: 'cardapio', component: CardapioComponent},
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent,},
  { path: 'admin/gerenciar/produtos', component: AdminCardapioComponent, canActivate: [adminGuard]},
  { path: 'admin/gerenciar/produtos/cadastrar', component: ProdutoAddComponent, canActivate: [adminGuard]},
  { path: 'meu-perfil', component: MeuPerfilComponent},
  { path: '', component: InicioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
