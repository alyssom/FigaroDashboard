import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, public afAuth: AngularFireAuth, public service: GerenciadorUsuariosService) { 

  }

  minhaBarbearia(){
    this.router.navigate(['minhaBarbearia']);
  }
  home(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }
  logout(){
    this.afAuth.auth.signOut();
    this.service.limpaDados();
    this.router.navigate([''])
  }

}
