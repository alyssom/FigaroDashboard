import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-agendamentos-concluidos',
  templateUrl: './agendamentos-concluidos.component.html',
  styleUrls: ['./agendamentos-concluidos.component.css']
})
export class AgendamentosConcluidosComponent implements OnInit {

  nome;
  user;
  minhaBarbearia;
  agendamentos;

  constructor(public afAuth: AngularFireAuth, private router: Router, public service: GerenciadorUsuariosService,
   private db: AngularFireDatabase) {
   
    this.agendamentos = this.service.agendamentos;
   }


  ngOnInit() {
    this.nome = this.service.nomeUser;
      if(this.service.user != undefined){
        this.user = this.service.user.user;
      }
      this.minhaBarbearia = this.service.minhaBarbearia;
      function agendamentosNaoAtendidos(element, index, array) { 
        return (element.atendido == true); 
      } 
      this.agendamentos = this.service.agendamentos;
      this.agendamentos = this.agendamentos.filter(agendamentosNaoAtendidos);
  }

}
