import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  barbearias = [];
  ;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router){
       this.db.list('/barbearias', { preserveSnapshot: true })
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.barbearias.push(snapshot.val());
          }
        )
      }
    )
  }
 
  
}
