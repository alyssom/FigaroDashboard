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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MinhaBarbeariaComponent
  ],
  imports: [
    BrowserModule,
     AngularFireModule.initializeApp(FIREBASE_CREDENCIAL),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
