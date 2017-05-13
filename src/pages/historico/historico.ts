import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { HistoricoMensagensPage } from "../historico-mensagens/historico-mensagens";
import { Chat } from "../../models/chat";

/**
 * Generated class for the Historico page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {
  
  lista: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private af: AngularFire) {
    this.lista=af.database.list("https://chat-50afe.firebaseio.com/");


    this.lista = af.database.list("chat");
  }

  seleciona(item:Chat){
    this.navCtrl.push(HistoricoMensagensPage, {item: item});
  }

}
