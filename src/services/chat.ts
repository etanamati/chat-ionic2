import { DatePipe } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {
    
    private lista: FirebaseListObservable<any>;
    constructor(private af: AngularFire, private datePipe: DatePipe) {
        this.lista = this.af.database.list('chat');
        console.log(this.lista);
    }

    getLista(): FirebaseListObservable<any>{
       return this.af.database.list('chat'); 
    }
    findChatByData(data: String): any{
        return this.af.database.list('chat', {
            query: {
                orderByChild: 'data',
                equalTo: data
            }
        });
    }

    enviarMensagens(mensagem: any){
      const dia = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
      let enviou = false;
      let chat = this.findChatByData(dia);
      chat.subscribe(dados => {
        if(!enviou){
            if (dados.length == 0){
                const novoChat = {
                    data: dia,
                    mensagens: [mensagem]
                }
                this.lista.push(novoChat);
            }else{
                let alteraChat = {
                    key: dados[0].$key,
                    mensagens: []
                }
                dados[0].mensagens.push(mensagem);
                alteraChat.mensagens = dados[0].mensagens;
                this.lista.update(alteraChat.key, alteraChat);
            }
            enviou = true;
        }
      });
    }

    

}