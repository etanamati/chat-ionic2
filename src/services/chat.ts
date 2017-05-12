import { FirebaseListObservable, AngularFire } from "angularfire2";
import { Injectable } from '@angular/core';
import { Chat } from "../models/chat";

@Injectable()
export class ChatService {
    
    private lista: FirebaseListObservable<any>;
    
    constructor(private af: AngularFire) {
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

    enviarMensagens(chat: any){
      console.log('chat ', chat);
      //return this.af.database.object(chat.$key).set(chat);
      return this.lista.update(chat.$key, chat);
      
    }

    

}