import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Historico');
  }

}
