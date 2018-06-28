import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  constructor(public afAuth: AngularFireAuth, private router: Router){
      
  }
  
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(user => {
        this.user = user;
        console.log(this.user)
      
        if(this.user.user.displayName == "Alyssom Falkenberg" || this.user.user.displayName == "Deivid Ribeiro" || this.user.user.displayName == "Aline de Campos" || this.user.user.displayName == "Jonatas Duarte Fraga"){
          this.router.navigate(['home'])
        }
    }).catch(error => {

      //console.log(error.status);
      //console.log(error.error); // error message as string
      //console.log(error.headers);

    });
    
    
  }

  ngOnInit() {
  }

}
