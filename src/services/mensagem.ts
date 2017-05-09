import { Usuario } from "../models/usuario";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { Injectable } from "@angular/core/src/di";
import { Mensagem } from "../models/mensagem";

@Injectable()
export class MensagemService {
    
    private mensagemFirebase: FirebaseListObservable<any>;
    
    constructor(private af: AngularFire) {
        this.mensagemFirebase = this.af.database.list('mensagem');
    }

    registraUsuario(mensagem: Mensagem) {

      this.mensagemFirebase.push(mensagem);

    }
}