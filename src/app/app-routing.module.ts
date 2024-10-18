import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreComponent } from './sobre/sobre.component';
import { CartComponent } from './cart/cart.component';


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
