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

  //Servicio para casas
  getCasas(): Observable<any>
  {
  return this.firestore.collection('casas').snapshotChanges();
  }

  //Servicio de validación
  getOcu(corre: string): Observable<any>
  {
    return this.firestore.collection("Usuarios",ref=> ref.where("Correo","==",corre)).valueChanges();
  }

  datoscasa(id: string): Observable<any>
  {
    return this.firestore.collection("casas").doc(id).snapshotChanges();
  }

  ActualizarCasa(id: string,data: any): Promise <any>
  {
    return this.firestore.collection("casas").doc(id).update(data);
  }

}