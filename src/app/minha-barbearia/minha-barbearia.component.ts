import { Component, OnInit } from '@angular/core';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-minha-barbearia',
  templateUrl: './minha-barbearia.component.html',
  styleUrls: ['./minha-barbearia.component.css']
})
export class MinhaBarbeariaComponent implements OnInit {

  
  fotoUser;
  fotoBarbearia;
  minhaBarbearia;

  constructor(public service: GerenciadorUsuariosService, public router: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.minhaBarbearia = this.router.params.subscribe(res => console.log(res));
    console.log(this.minhaBarbearia);
    this.fotoBarbearia = this.service.foto;
  }

}
