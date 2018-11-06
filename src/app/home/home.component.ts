import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import { AngularFireDatabase } from 'angularfire2/database';
import {Chart} from 'chart.js';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nome;
  user;
  minhaBarbearia;
  agendamentos;
  myChart = [];

  constructor(public afAuth: AngularFireAuth, private router: Router, public service: GerenciadorUsuariosService,
   private db: AngularFireDatabase, private chartService: ChartsService) {
   
   }
  ngOnInit() {
    
    this.nome = this.service.nomeUser;
    if(this.service.user != undefined){
      this.user = this.service.user.user;
    }
    
    this.agendamentos = this.service.agendamentos;
    this.minhaBarbearia = this.service.minhaBarbearia;
    


    this.db.list('agendamentos/', { preserveSnapshot: true })
        .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                if(snapshot.val().nome == this.minhaBarbearia.nome){
                    if(snapshot.val().atendido == true){
                        this.service.agendamentosAtendidos.push(snapshot.val());
                    }
                }
            })
            this.geraCanvasUm();
            this.geraCanvasDois();
    })
    
   }
  
 separaAgendamentosAtendidos(element){
    return (element.atendido == true);
  }


public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
};
public barChartLabelsUm:string[] = ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24'];
public barChartLabelsDois:string[] = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0], label: 'Agendamentos'}
];

// events
public chartClicked(e:any):void {
    console.log(e);
}

public chartHovered(e:any):void {
    console.log(e);
}

public geraCanvasUm():any {
    // Only Change 3 values
    let horariosAgendamentosAtendidos = [];
    let contador: Array<Number> = [0, 0, 0, 0, 0, 0];

    console.log(this.service.agendamentosAtendidos)
    this.service.agendamentosAtendidos.forEach(element => {
        let horario: string; 
        horario = element.horario;
        let horaSplitado = horario.split(':')[0]
        horariosAgendamentosAtendidos.push(horaSplitado);
        console.log(horariosAgendamentosAtendidos)
    })
    horariosAgendamentosAtendidos.forEach(element => {
        if(element < 4){
            let cont;
            cont = contador[0];
            contador[0] = cont + 1;
        }
        if(element >= 4 && element < 8){
            let cont;
            cont = contador[1];
            contador[1] = cont + 1;
        }
        if(element >= 8 && element < 12){
            let cont;
            cont = contador[2];
            contador[2] = cont + 1;
        }
        if(element >= 12 && element < 16){
            let cont;
            cont = contador[3];
            contador[3] = cont + 1;
        }
        if(element >= 16 && element < 20){
            let cont;
            cont = contador[4];
            contador[4] = cont + 1;
        }
        if(element >= 20 && element < 24){
            let cont;
            cont = contador[5];
            contador[5] = cont + 1;
        }
    })

    console.log(contador)
    
    let data = contador;
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    return {data: this.barChartData, label: 'Agendamentos'};
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
}
public geraCanvasDois():any {
    // Only Change 3 values
    let horariosAgendamentosAtendidos = [];
    let contador: Array<Number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    console.log(this.service.agendamentosAtendidos)
    this.service.agendamentosAtendidos.forEach(element => {
        let horario: string; 
        horario = element.horario;
        let horaSplitado = horario.split(':')[0]
        horariosAgendamentosAtendidos.push(horaSplitado);
        console.log(horariosAgendamentosAtendidos)
    })
    horariosAgendamentosAtendidos.forEach(element => {
        if(element < 2){
            let cont;
            cont = contador[0];
            contador[0] = cont + 1;
        }
        if(element >= 2 && element < 4){
            let cont;
            cont = contador[1];
            contador[1] = cont + 1;
        }
        if(element >= 4 && element < 6){
            let cont;
            cont = contador[2];
            contador[2] = cont + 1;
        }
        if(element >= 6 && element < 8){
            let cont;
            cont = contador[3];
            contador[3] = cont + 1;
        }
        if(element >= 8 && element < 10){
            let cont;
            cont = contador[4];
            contador[4] = cont + 1;
        }
        if(element >= 10 && element < 12){
            let cont;
            cont = contador[5];
            contador[5] = cont + 1;
        }
        if(element >= 12 && element < 14){
            let cont;
            cont = contador[6];
            contador[6] = cont + 1;
        }
        if(element >= 14 && element < 16){
            let cont;
            cont = contador[7];
            contador[7] = cont + 1;
        }
        if(element >= 16 && element < 18){
            let cont;
            cont = contador[8];
            contador[8] = cont + 1;
        }
        if(element >= 18 && element < 20){
            let cont;
            cont = contador[9];
            contador[9] = cont + 1;
        }
        if(element >= 20 && element < 22){
            let cont;
            cont = contador[10];
            contador[10] = cont + 1;
        }
        if(element >= 22 && element < 24){
            let cont;
            cont = contador[11];
            contador[11] = cont + 1;
        }
    })

    console.log(contador)
    
    let data = contador;
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    return {data: this.barChartData, label: 'Agendamentos'};
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
}

}
