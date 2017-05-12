import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from "../../services/usuario";
import { Chat } from "../../models/chat";
import { DatePipe } from '@angular/common';
import { ChatService } from "../../services/chat";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  lista: FirebaseListObservable<any>;
  mensagem: string;
  usuario: string;
  novoChat: Chat;
  
  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private af: AngularFire,
              private usuarioService: UsuarioService,
              private datePipe: DatePipe,
              private chatService: ChatService) {
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

    let conteudoMensagem = {
      texto: this.mensagem,
      hora: this.datePipe.transform(new Date(), 'hh:mm:ss'),
      usuario: this.usuario    
    }

    this.chatService.enviarMensagens(conteudoMensagem);
    /*let chat = {
      data: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      mensagens: [
        {
          texto: this.mensagem,
          hora: this.datePipe.transform(new Date(), 'hh:mm:ss'),
          usuario: this.usuario    
        }
      ]
    }
*/
    // const retorno = this.chatService.findChatByData(this.datePipe.transform(new Date(), 'dd/MM/yyyy'));
    // retorno.subscribe(u =>  {
    //   console.log('1u', u);
    //   let conteudoMensagem = {
    //     texto: this.mensagem,
    //     hora: this.datePipe.transform(new Date(), 'hh:mm:ss'),
    //     usuario: this.usuario    
    //   }
    //   if (u.length == 0){
    //     this.novoChat = {
    //       data: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
    //       mensagens: [
    //         conteudoMensagem
    //       ]
    //     }
    //     this.chatService.enviarMensagem(this.novoChat);
    //   }else{
    //     //this.novoChat.mensagens.push(conteudoMensagem);
    //     console.log('this.lista',this.lista);
    //     this.lista.subscribe(dados => {
          
    //       console.log('dados', dados[0].mensagens);
    //       //dados[0].mensagens.push(conteudoMensagem);
    //       //console.log('dados-depois', dados[0].mensagens);

    //       this.chatService.enviarMensagens(dados[0], conteudoMensagem);
    //     });
    //   }

      
    // });

    
  }

}