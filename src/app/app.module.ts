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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { LoginComponent } from './pages/login/login.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from './components/primary-input/primary-input.component';
import { LoginAdmComponent } from './pages/admin/login-adm/login-adm.component';
import { GerenciarAdmComponent } from './pages/admin/gerenciar-adm/gerenciar-adm.component';
import { CardapioAdmComponent } from './pages/admin/cardapio-adm/cardapio-adm.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ContatoComponent,
    CardapioComponent,
    SobreComponent,
    CartComponent,
    LoginComponent,
    LoginAdmComponent,
    GerenciarAdmComponent,
    CardapioAdmComponent,
  ],
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
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
