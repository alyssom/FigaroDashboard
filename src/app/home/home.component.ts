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
    this.nome = this.service.nomeUser;
      if(this.service.user != undefined){
        this.user = this.service.user.user;
      }
      
      this.agendamentos = this.service.agendamentos;
      this.minhaBarbearia = this.service.minhaBarbearia;

     
   }

  ngOnInit() {
    this.chartService.dailyForecast()
        .subscribe(res => {
          console.log(res)
           let temp_max = res['list'].map(res => res.temp.max);
           let temp_min = res['list'].map(res => res.temp.min);
           let dt = res['list'].map(res => res.dt);

           let weatherDates = [];
           dt.forEach((res) => {
             let jsdate = new Date(res * 1000)
             weatherDates.push(jsdate.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric'}))
           });
           console.log(weatherDates)

           this.myChart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: temp_max,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            } 
          })
        })
  }
  
}
