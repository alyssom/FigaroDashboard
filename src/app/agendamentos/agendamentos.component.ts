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
    this.nome = this.service.nomeUser;
      if(this.service.user != undefined){
        this.user = this.service.user.user;
      }
      
      this.agendamentos = this.service.agendamentos;
      this.minhaBarbearia = this.service.minhaBarbearia;
   }


  ngOnInit() {
  }

  finalizarServico(agendamento){
    console.log(agendamento)
    this.db.list('/agendamentos', { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
          if(snapshot.val().nome == this.minhaBarbearia.nome && snapshot.val().dataAgendamento == agendamento.dataAgendamento){
            this.db.list('/agendamentos', {preserveSnapshot: true})
            .update(snapshot.key, {
              atendido: true,
              dataAgendamento: agendamento.dataAgendamento,
              dataAtual: agendamento.dataAtual,
              duracao: agendamento.duracao,
              horario: agendamento.horario,
              nome: agendamento.nome,
              nomeCliente: agendamento.nomeCliente,
              servico: agendamento.servico
            })
          }
      })
    })
  }


}
