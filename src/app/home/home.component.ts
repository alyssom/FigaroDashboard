import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nome;
  user;
  minhaBarbearia;
  agendamentos;

  constructor(public afAuth: AngularFireAuth, private router: Router, public service: GerenciadorUsuariosService) {
    this.nome = this.service.nomeUser;
      if(this.service.user != undefined){
        this.user = this.service.user.user;
      }
      this.agendamentos = this.service.agendamentos;
      this.minhaBarbearia = this.service.minhaBarbearia;
   }

  ngOnInit() {
  }
  
  
}
