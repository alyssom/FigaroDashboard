import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { MinhaBarbeariaComponent } from '../minha-barbearia/minha-barbearia.component';
import { CadastroComponent } from '../cadastro/cadastro.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'minhaBarbearia', component: MinhaBarbeariaComponent }
  
  ];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})


export class AppRoutingModule {
  
 }
