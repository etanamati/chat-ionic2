import { AutenticacaoService } from './../../services/autenticacao';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ValidacoesGerais } from "../../services/validacoesGerais";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario";

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  form: FormGroup;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private loadingCtrl: LoadingController, 
              private autenticacaoService: AutenticacaoService,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService) {
    this.buildValidacoes();
  }

  buildValidacoes(){
    const formCtrl: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
    const formCtrlConfirmaSenha: FormControl = new FormControl('', Validators.compose([Validators.required, ValidacoesGerais.valoresIguais(formCtrl)]));
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      email: ['', Validators.required],
      senha: formCtrl,
      confirmacaoSenha: formCtrlConfirmaSenha
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }

  registra() {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o registro da aplicação'
    });
    loading.present();

    const usuario: Usuario = {usuario: this.form.value.usuario, 
                              email: this.form.value.email};
    
    this.autenticacaoService.registra(this.form.value.email, this.form.value.senha)
      .then(data => {
          this.usuarioService.registraUsuario(usuario);
          loading.dismiss();
        })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no registro',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
    
  }
}
