import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private firestore: AngularFirestore) { }

  getNoAp(corre: string, contra: string):Observable<any>
  {
    
    return this.firestore.collection("Usuarios", ref => ref.where("Correo","==",corre).where("Contraseña","==",contra)).valueChanges();
  }
}