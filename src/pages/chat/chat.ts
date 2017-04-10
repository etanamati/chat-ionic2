import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  lista: FirebaseListObservable<any>;
  mensagem: string;
  usuario: string;
  senha: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire) {
    this.usuario = this.navParams.get('usuario');
    this.lista=af.database.list("https://chat-50afe.firebaseio.com/")
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