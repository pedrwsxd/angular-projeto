import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './pages/contato/contato.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  { path: 'contato', component: ContatoComponent},
  { path: 'carrinho', component: CartComponent },
  { path: 'sobre', component: SobreComponent},
  { path: 'cardapio', component: CardapioComponent},
  { path: '', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
