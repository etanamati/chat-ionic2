import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from "../../models/chat";

/**
 * Generated class for the HistoricoMensagens page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-historico-mensagens',
  templateUrl: 'historico-mensagens.html',
})
export class HistoricoMensagensPage {

  private item: any;
  private mensagens: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    
    this.item = this.navParams.get('item');
    this.mensagens = this.item.mensagens;
  }

}
