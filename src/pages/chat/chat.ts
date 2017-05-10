import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from "../../services/usuario";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  lista: FirebaseListObservable<any>;
  mensagem: string;
  usuario: string;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private af: AngularFire,
              private usuarioService: UsuarioService) {
    this.usuario = this.navParams.get('usuario');
    this.lista=af.database.list("https://chat-50afe.firebaseio.com/");


    this.lista = af.database.list("chat");

    this.af.auth.subscribe(auth => {
      if(auth) {
        const usuario: any = usuarioService.findUsuario(auth.auth.email);
        usuario.subscribe(u =>  {
          this.usuario = u[0].usuario;
        });
      }
    });
  }

  enviarMsg() {
    console.log(this.usuario);
    let msg = {
      texto: this.mensagem,
      data: new Date().toString(),
      usuario: this.usuario
    };
    console.log(msg);
    this.lista.push(msg).then(()=> {
      this.mensagem = "";
      }
    )
  }

}