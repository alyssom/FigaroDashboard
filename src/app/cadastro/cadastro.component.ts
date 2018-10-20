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
        fotos: [null]
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
        fotos: [null]
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
             enderecoBarberShop: enderecoBarberShop,
             cepBarberShop: cepBarberShop,
             servicos: servicos,
             fotoProprietario: fotoProprietario,
             horario_de: horario_de,
             horario_ate: horario_ate,
             fotos: [] = downloadUrl
          };

          updates['/barbearias/' + postKey] = postData;
          firebase.database().ref().update(updates);

        })

        //   this.fdb.list("/barbearias/").push({
        //     nome: this.formulario.value.nomeBarberShop,
        //     nomeProprietario: this.formulario.value.nomeProprietario,
        //     nomeBarberShop: this.formulario.value.nomeBarberShop,
        //     enderecoBarberShop: this.formulario.value.enderecoBarberShop,
        //     cepBarberShop: this.formulario.value.cepBarberShop,
        //     servicos: this.formulario.value.servicos,
        //     fotos: downloadUrl,
        //     fotoProprietario: this.formulario.value.fotoProprietario,
        //     horario_de: this.formulario.value.horario_de,
        //     horario_ate: this.formulario.value.horario_ate
        //   });
        // }
       

  }



}
