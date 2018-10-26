import { Component, OnInit } from '@angular/core';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import { Navigation } from 'selenium-webdriver';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  user;
  minhaBarbearia;
  constructor(public service: GerenciadorUsuariosService, public router: Router) { 
    if(this.service.user != undefined){
      this.user = this.service.user.user;
    }
    this.minhaBarbearia = this.service.minhaBarbearia;
  }

  vaiMinhaBarbearia(){
    this.router.navigate(['minhaBarbearia'], this.minhaBarbearia);
  }
  vaiAgendamentos(){
    this.router.navigate(['agendamentos'], this.minhaBarbearia);
  }
  vaiHome(){
    this.router.navigate(['home'], this.minhaBarbearia);
  }
  vaiAgendamentosConcluidos(){
    this.router.navigate(['agendamentosConcluidos'], this.minhaBarbearia);
  }
  ngOnInit() {
  }

}
