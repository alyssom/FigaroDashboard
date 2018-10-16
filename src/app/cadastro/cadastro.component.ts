import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GerenciadorUsuariosService } from '../gerenciador-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;
  user = null;

  constructor(private fdb: AngularFireDatabase, private formBuilder: FormBuilder, private service: GerenciadorUsuariosService) { 
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
    this.formulario.value.fotos = img.target.files[0];
  }
  

  cadastrar(){
    const swal = require('sweetalert2');

    this.fdb.list("/barbearias/").push({
      nome: this.formulario.value.nomeBarberShop,
      nomeProprietario: this.formulario.value.nomeProprietario,
      nomeBarberShop: this.formulario.value.nomeBarberShop,
      enderecoBarberShop: this.formulario.value.enderecoBarberShop,
      cepBarberShop: this.formulario.value.cepBarberShop,
      servicos: this.formulario.value.servicos,
      fotos: this.formulario.value.fotos,
      fotoProprietario: this.formulario.value.fotoProprietario,
      horario_de: this.formulario.value.horario_de,
      horario_ate: this.formulario.value.horario_ate
    });

    swal({
      position: 'center',
      type: 'success',
      title: 'BarberShop Cadastrada com Sucesso!',
      showConfirmButton: false,
      timer: 2000
    })
  }



}
