import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuarios } from '../modelos/usuarios';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Users: Observable<Usuarios[]>
  private UsersCollection: AngularFirestoreCollection<Usuarios>
  constructor(private firestore: AngularFirestore) {
    this.UsersCollection = firestore.collection<Usuarios>("Usuarios")
    this.getUsuarios();

  }

  getUsuarios() {
    this.Users = this.UsersCollection.snapshotChanges().pipe(
      map(actions => actions.map(it => {
        const data = it.payload.doc.data();
        const res = new Usuarios(
          it.payload.doc.id,
          data.Nombre,
          data.Apellido,
          data.Correo
        );
        return res;
      })
      ));
  }

  eliminarUsuario(nombre: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const result = await this.UsersCollection.doc(nombre).delete();
        resolve(result);
      } catch (error) {
        reject(error.mesagge);
      }
    })
  }
}
