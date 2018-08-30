import { Component, OnInit } from '@angular/core';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';

@Component({
  selector: 'app-minha-barbearia',
  templateUrl: './minha-barbearia.component.html',
  styleUrls: ['./minha-barbearia.component.css']
})
export class MinhaBarbeariaComponent implements OnInit {

  foto1;
  user;

  constructor(public service: GerenciadorUsuariosService) { 
    if(this.service.user.user){
      this.user = this.service.user.user;
    }
    
    this.foto1 = this.service.foto1;
  }

  ngOnInit() {
   
  }

}
