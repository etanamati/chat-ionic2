import { FirebaseListObservable, AngularFire } from "angularfire2";
import { Injectable } from "@angular/core";
import { Mensagem } from "../models/mensagem";

@Injectable()
export class MensagemService {
    
    private mensagemFirebase: FirebaseListObservable<Mensagem>;
    
    constructor(private af: AngularFire) {
        this.mensagemFirebase = this.af.database.list('chat');
    }

    registraUsuario(mensagem: Mensagem) {

      this.mensagemFirebase.push(mensagem);

    }

    getMensagens(): FirebaseListObservable<Mensagem>{
        return this.af.database.list('chat');
    }
}