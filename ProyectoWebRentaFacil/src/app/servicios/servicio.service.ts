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

  //servicio para obtener datos bancarios
  getdatosBanc(correo: string):Observable<any>{
    return this.firestore.collection("Usuarios",ref=> ref.where("Correo","==",correo)).valueChanges();
  }

  //servicio de casa para reservar
  getCasa(id: string):Observable<any>{
    return this.firestore.collection("casas").doc(id).valueChanges();
  }

  //crear reservacion
  crearReser(id:string, prop:string, rent: string, est: string, mun: string, ub: string, ent: string, sal: string){
    this.firestore.collection("casaReservada").add({
      id: id,
      Estado: est,
      Municipio: mun,
      Ubicacion: ub,
      Dueño: prop,
      Cliente: rent,
      Entrada: ent,
      Salida: sal
    }).then((finalizado) =>{})
  }
}