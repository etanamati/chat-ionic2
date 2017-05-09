import { Usuario } from "../models/usuario";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {
    
    private lista: FirebaseListObservable<Usuario>;
    
    constructor(private af: AngularFire) {
        this.lista = this.af.database.list('usuario');
        console.log(this.lista);
    }

    registraUsuario(usuario: Usuario) {
        console.log(usuario);
      this.lista.push(usuario);
    }

    findUsuario(email: String): Usuario{
        return this.af.database.list('usuario', {
            query: {
                orderByChild: 'email',
                equalTo: email
            }
        });
    }
}