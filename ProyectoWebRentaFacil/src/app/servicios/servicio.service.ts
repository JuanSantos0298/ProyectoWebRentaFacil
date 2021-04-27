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

    //Servicio para casas de propietarios
    getCasasPro(correo: string): Observable<any>
    {
    return this.firestore.collection('casas',ref => ref.where("Dueño","==",correo)).snapshotChanges();
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

  crearReser(id:string, prop:string, rent: string, est: string, mun: string, ub: string, ent: string, sal: string, cos: any){
    this.firestore.collection("casaReservada").add({
      id: id,
      Estado: est,
      Municipio: mun,
      Ubicacion: ub,
      Dueño: prop,
      Cliente: rent,
      Entrada: ent,
      Salida: sal,
      Pago: cos
    }).then((finalizado) =>{})
  }

  //servicio para obtener datos bancarios
  getdatosBanc(correo: string):Observable<any>{
    return this.firestore.collection("Usuarios",ref=> ref.where("Correo","==",correo)).valueChanges();
  }

    //servicio de casa para reservar
    getCasa(id: string):Observable<any>{
      return this.firestore.collection("casas").doc(id).valueChanges();
    }

    //servicio de eliminar casa
    eliminarCasa(id:string): Promise <any> {
      return this.firestore.collection("casas").doc(id).delete();
    }
  
    //visualizas rentas
    visualizarRenta(correo: string): Observable<any> 
    {
      return this.firestore.collection("casaReservada", ref=>ref.where("Cliente",'==',correo)).snapshotChanges();
    }

    //eliminar renta
    eliminarrenta(iden:string): Promise <any> 
    {
      return this.firestore.collection("casaReservada").doc(iden).delete();
    }

    //obtener datos y id de la persona
    obtenerid(correo: string): Observable<any>
    {
      return this.firestore.collection("Usuarios",ref => ref.where("Correo","==",correo)).snapshotChanges();
    }

    //actualizar la información de un usuario
    ActualizarUsuario(id: string,data: any): Promise <any>
    {
      return this.firestore.collection("Usuarios").doc(id).update(data);
    }

    //visualizas ganancias
    visualizarGanancias(correo: string): Observable<any> 
    {
      return this.firestore.collection("casaReservada", ref=>ref.where("Dueño",'==',correo)).snapshotChanges();
    }

    //cargar comentarios servicio
    Cacomentarios(id:string): Observable<any> 
    {
      return this.firestore.collection("casaComentarios",ref =>ref.where("IdCasa","==",id)).snapshotChanges();
    }

    ///cargar datos de casa
    CaDatos(id:string): Observable<any> 
    {
        return this.firestore.collection("casas").doc(id).valueChanges();
    }
}