import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CartComponent } from './pages/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ContatoComponent,
    CardapioComponent,
    SobreComponent,
    CartComponent
  ],
  imports: [
    FontAwesomeModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    CartService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
