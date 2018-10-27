import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import Swal from 'sweetalert2';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage'
import { storage } from 'firebase';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;
  fotoSelecionada: File;
  user = null;
  fotos;
  downloadURL;

  constructor(private fdb: AngularFireDatabase, private formBuilder: FormBuilder, 
    private service: GerenciadorUsuariosService, private firebase: FirebaseApp) { 
    if(service.user != null || service.user != undefined){
      this.user = service.user;
    }
  }

  ngOnInit() {
    if(this.user != null || this.user != undefined){
      this.formulario = this.formBuilder.group({
        nomeProprietario: this.user.user.displayName,
        nomeBarberShop: [null],
        enderecoBarberShop: [null],
        cepBarberShop: [null],
        servicos: [null],
        email: this.user.user.email,
        fotoProprietario: this.user.user.photoURL,
        horario_de: [null],
        horario_ate: [null],
        fotos: [null],
        estacionamento: [null],
        bar: [null]
      })
    }else{
      this.formulario = this.formBuilder.group({
        nomeProprietario: [null],
        nomeBarberShop: [null],
        enderecoBarberShop: [null],
        cepBarberShop: [null],
        servicos: [null],
        email: [null],
        fotoProprietario: [null],
        horario_de: [null],
        horario_ate: [null],
        fotos: [null],
        estacionamento: [null],
        bar: [null]
      })
    }
  }
  imgSelecionada(img){
    console.log(img.target.files[0]);
    this.fotoSelecionada = img.target.files[0];
  }
  

  cadastrar(){
      var nome = this.formulario.value.nomeBarberShop;
      var nomeProprietario = this.formulario.value.nomeProprietario;
      var nomeBarberShop = this.formulario.value.nomeBarberShop;
      var enderecoBarberShop = this.formulario.value.enderecoBarberShop;
      var cepBarberShop = this.formulario.value.cepBarberShop;
      var servicos = this.formulario.value.servicos;
      var fotoProprietario = this.formulario.value.fotoProprietario;
      var horario_de = this.formulario.value.horario_de;
      var horario_ate = this.formulario.value.horario_ate;
      var estacionamento = this.formulario.value.estacionamento;
      var bar = this.formulario.value.bar;

      this.validaNomeBarberShopDuplicado(nome);
      this.validaHoraAbreHoraFecha(horario_de, horario_ate);
      this.validaFotoSelecionadaNula(this.fotoSelecionada);
      this.validaEnderecoNulo(enderecoBarberShop, cepBarberShop);
      this.validaServicosNulo(servicos);
      
       var downloadUrl;
       var fileName = this.fotoSelecionada.name;
       const storageRef = firebase.storage().ref('/imagensBarbearias/' + fileName);
       var uploadTask = storageRef.put(this.fotoSelecionada);

       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){

          console.log(snapshot);

        }, function(error){
          console.log(error)
        }, function(){

          var postKey = firebase.database().ref('barbearias/').push().key;
          downloadUrl = uploadTask.snapshot.downloadURL;
          console.log(downloadUrl)
          var updates = {};
          var postData = {
             nome: nome,
             nomeProprietario: nomeProprietario,
             nomeBarberShop: nomeBarberShop,
             logradouro: enderecoBarberShop,
             cepBarberShop: cepBarberShop,
             servicos: servicos,
             fotoProprietario: fotoProprietario,
             horario_de: horario_de,
             horario_ate: horario_ate,
             foto: [] = downloadUrl,
             estacionamento: estacionamento,
             bar: bar
          };

          updates['/barbearias/' + postKey] = postData;
          firebase.database().ref().update(updates);

        })
  }


  validaServicosNulo(servicos: any): any {
    if(servicos == null || servicos == undefined){
      Swal('Favor informar os Serviços do BarberShop.')
    }
  }
  validaEnderecoNulo(enderecoBarberShop: any, cepBarberShop: any): any {
    if(enderecoBarberShop == null || enderecoBarberShop == undefined){
      Swal('Favor informar o Endereço do BarberShop.')
    }
    if(cepBarberShop == null || cepBarberShop == undefined){
      Swal('Favor informar o CEP do BarberShop.')
    }
  }
  validaNomeBarberShopDuplicado(nome){
    this.fdb.list('/barbearias', { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.val().nome == nome){
          Swal('Ops... Já Existe um BarberShop com este nome.')
        }
      }
    )
  }
)
  }

  validaHoraAbreHoraFecha(horaAbre, horaFecha){
    if(horaAbre == null || horaFecha == null){
      Swal('Favor informar horário de funcionamento.')
    }
    if(horaAbre >= horaFecha){
      Swal('Ops... Horário de funcionamento inválido.')
    }
  }

  validaFotoSelecionadaNula(fotoSelecionada: File): any {
    if(fotoSelecionada == null || fotoSelecionada == undefined){
      Swal('Selecione um Imagem para sua BarberShop.')
    }
  }
}
