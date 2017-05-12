import { DatePipe } from '@angular/common';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Injectable } from '@angular/core';
import { Chat } from "../models/chat";

@Injectable()
export class ChatService {
    
    private lista: FirebaseListObservable<any>;
    private value: FirebaseObjectObservable<any>;
    constructor(private af: AngularFire, private datePipe: DatePipe) {
        this.lista = this.af.database.list('chat');
        console.log(this.lista);
    }

    findChatByData(data: String): any{
        console.log(data);
        return this.af.database.list('chat', {
            query: {
                orderByChild: 'data',
                equalTo: data
            }
        });
    }

    enviarMensagem(chat: any){
        console.log('chat ', chat);
        return this.lista.push(chat);
        
    }

    enviarMensagens(mensagem: any){
      const hoje = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
      let cara = this.findChatByData(hoje);

      console.log('cara', cara);

      if(!cara) {
          //novo registro
          let novoChat = {
            data: hoje,
            mensagens: [mensagem]
            }
          this.enviarMensagem(novoChat);
      } else {
          cara.subscribe(item => {
              console.log('item', item[0]);
              item[0].mensagens.push(mensagem);
              //this.value = this.af.database.object('/chat/'+ item[0].key);
              //this.value.update(item[0]).then(_ => console.log('update!'));
              //this.lista.update(item[0]).then(_ => console.log('update!');
              console.log(item[0].$key);
              this.af.database.object(item[0].$key).set(item[0]);
          });
          
          //cara[0].mensagens.push(mensagem);
      }

      //this.lista.update(chat.key, chat);
      //return this.af.database.object(chat.$key).set(chat);
      //return this.lista.update(chat.$key, chat);
      
      //return this.lista[0].mensagens.push(mensagem);
      
    }

    

}