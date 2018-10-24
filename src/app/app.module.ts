import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CREDENCIAL } from './firebase.credencial';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MinhaBarbeariaComponent } from './minha-barbearia/minha-barbearia.component';
import { GerenciadorUsuariosService } from './gerenciador-usuarios.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MinhaBarbeariaComponent,
    CadastroComponent,
    NavbarComponent,
    MenuLateralComponent
  ],
  imports: [
    BrowserModule,
     AngularFireModule.initializeApp(FIREBASE_CREDENCIAL),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GerenciadorUsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
