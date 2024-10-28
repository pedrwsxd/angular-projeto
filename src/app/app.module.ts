import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { LoginComponent } from './pages/login/login.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from './components/primary-input/primary-input.component';
import { GerenciarAdmComponent } from './pages/admin/gerenciar-adm/gerenciar-adm.component';
import { RouterModule } from '@angular/router';
import { AdminCardapioComponent } from './pages/admin/admin-cardapio/admin-cardapio.component';
import { ProdutoAddComponent } from './pages/admin/produto-add/produto-add.component';
import { IonicModule } from '@ionic/angular';
import { AuthInterceptor } from './services/adm/auth-interceptor.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';




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
    GerenciarAdmComponent,
    AdminCardapioComponent,
    ProdutoAddComponent,
    UnauthorizedComponent,
    MeuPerfilComponent,
    MeusPedidosComponent,
    
  
  ],
  imports: [
    PrimaryInputComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    IonicModule,
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    SignupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    
    provideClientHydration(),
    CartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
