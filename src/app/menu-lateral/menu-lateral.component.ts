import { Component, OnInit } from '@angular/core';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  user;
  minhaBarbearia;
  constructor(public service: GerenciadorUsuariosService) { 
    if(this.service.user != undefined){
      this.user = this.service.user.user;
    }
    this.minhaBarbearia = this.service.minhaBarbearia;
  }

  ngOnInit() {
  }

}
