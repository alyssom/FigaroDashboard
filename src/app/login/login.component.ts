import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  constructor(public afAuth: AngularFireAuth, private service: GerenciadorUsuariosService){
      
  }
  
  login() {
    this.service.logar();
  }

  ngOnInit() {
  }

}
