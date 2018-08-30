import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class GerenciadorUsuariosService {

  public user;
  public nomeUser;
  public minhaBarbearia;
  public foto1;
  public agendamentos = [];
  
  nomeProprietario;
  

  constructor( private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router) { 

  }

  logar(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(user => {
        this.user = user;
        console.log(this.user)
        this.nomeUser = this.user.user.displayName; 

        this.db.list('/barbearias', { preserveSnapshot: true })
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if(snapshot.val().nomeProprietario == this.nomeUser){
              this.nomeProprietario = snapshot.val().nomeProprietario;
              this.foto1 = snapshot.val().foto1;
              this.minhaBarbearia = snapshot.val();
              this.db.list('/agendamentos', { preserveSnapshot: true })
              .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                  console.log(snapshot.val().nome);
                      if(snapshot.val().nome == this.minhaBarbearia.nome){
                        this.agendamentos.push(snapshot.val())
                      }
                    
                  
                }
              )
            })

              this.router.navigate(['home']);
            }
          }
        )
      }
    )
    if(this.nomeProprietario != this.nomeUser){
      this.router.navigate(['cadastro']);
    }
    }).catch(error => {

      //console.log(error.status);
      //console.log(error.error); // error message as string
      //console.log(error.headers);

    });
  }

  limpaDados(){
    this.user = "";
    this.nomeUser = "";
    this.nomeProprietario = "";
    this.minhaBarbearia = "";
    this.agendamentos = [];
  }

}
