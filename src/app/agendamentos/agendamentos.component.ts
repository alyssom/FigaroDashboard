import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

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
        return (element.atendido == false); 
      } 
      this.agendamentos = this.service.agendamentos;
      this.agendamentos = this.agendamentos.filter(agendamentosNaoAtendidos);
  }

  finalizarServico(agendamento){
    console.log(agendamento)
    this.db.list('/agendamentos/', { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
          if(snapshot.val().nome == agendamento.nome && snapshot.val().dataAgendamento == agendamento.dataAgendamento  && snapshot.val().emailCliente == agendamento.emailCliente && snapshot.val().dataAtual == agendamento.dataAtual && snapshot.val().horario == agendamento.horario){
            this.db.list('/agendamentos/', {preserveSnapshot: true})
            .update(snapshot.key, {
              atendido: true,
              dataAgendamento: agendamento.dataAgendamento,
              dataAtual: agendamento.dataAtual,
              duracao: agendamento.duracao,
              horario: agendamento.horario,
              nome: agendamento.nome,
              emailCliente: agendamento.emailCliente,
              servico: agendamento.servico
            })
          }
      })
    })
    function agendamentosNaoAtendidos(element, index, array) { 
      return (element.atendido == false); 
    } 
    this.agendamentos = this.service.agendamentos;
    this.agendamentos = this.agendamentos.filter(agendamentosNaoAtendidos);
  }


}
