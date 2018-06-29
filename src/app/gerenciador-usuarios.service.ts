import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class GerenciadorUsuariosService {

  public user;
  public nome;
  public minhaBarbearia;

  constructor( private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router) { 

  }

  logar(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(user => {
        this.user = user;
        console.log(this.user)
        this.nome = this.user.user.displayName; 

        this.db.list('/barbearias', { preserveSnapshot: true })
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if(snapshot.val().nomeProprietario == this.nome){
              this.minhaBarbearia = snapshot.val();
              this.router.navigate(['home']);
            }
          }
        )
      }
    )
    }).catch(error => {

      //console.log(error.status);
      //console.log(error.error); // error message as string
      //console.log(error.headers);

    });
  }

}
