import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: 'contato', component: ContatoComponent},
  { path: 'cardapio', component: CardapioComponent},
  { path: 'inicio', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
