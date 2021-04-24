import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ServicioService} from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';

//uso de imagen de perfil
import { Observable } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  image: any;
  datUsuario: any[]=[];
  noim: any;
  Datos: FormGroup;
  submited=false;
  id: string;
  correo:string
  d="";
  ///--------imagenes
  firepath: any;
  dowload: Observable<any>;
  ur="";

  constructor(private form: FormBuilder,private toas: ToastrService,private ruta: Router, private _usuario: ServicioService
    ,private aRout: ActivatedRoute, private firestorage: AngularFireStorage) {
      this.Datos=this.form.group({
        Nombre: [''],
        Apellido: [''],
        Cuenta: [''],
        CVC:[''],
        Telefono:[''],
        Contra:[''],
        imagen: [''],
      })
      this.correo=this.aRout.snapshot.paramMap.get('correo');
     }

  ngOnInit(): void {
    this.llenar();
  }

  llenar()
  {
    this._usuario.obtenerid(this.correo).subscribe( data => {
      this.datUsuario=[];
      data.forEach((element:any) => {
        this.datUsuario.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
      this.Datos.setValue(
        {
          Nombre: this.datUsuario[0]["Nombre"],
          Apellido: this.datUsuario[0]["Apellido"],
          Cuenta: this.datUsuario[0]["Cuentabancaria"],
          CVC: this.datUsuario[0]["CVC"],
          Telefono: this.datUsuario[0]["Telefono"],
          Contra: this.datUsuario[0]["Contraseña"],
          imagen: this.datUsuario[0]["imagen"],
        })
    });
  }

  carga(event: any): void
  {
    this.image=event.target.files[0];
    this.noim=event.target.files[0]["name"];
    this.subirPerfil(this.image,this.noim);
    this.toas.info("imagen cargando");
  }

  subirPerfil(imag: File,no:string)
  {
    this.firepath='imagenUsuario/'+no;
    const fileref = this.firestorage.ref(this.firepath);
    const task = this.firestorage.upload(this.firepath,imag);
    task.snapshotChanges().pipe(
      finalize(()=>{
        fileref.getDownloadURL().subscribe(urlimage =>{
          this.dowload = urlimage;
          this.guardaurl(urlimage);
        })
      })
    ).subscribe();
  }

  guardaurl(a: string)
  {
    this.ur= a;
  }

  actualizar()
  {
    const usuario: any ={
      Nombre: this.Datos.value.Nombre,
      Apellido: this.Datos.value.Apellido,
      Cuentabancaria: this.Datos.value.Cuenta,
      CVC: this.Datos.value.CVC,
      Telefono: this.Datos.value.Telefono,
      Contraseña: this.Datos.value.Contra,
      imagen: this.ur,
    }
    this._usuario.ActualizarUsuario(this.datUsuario[0]["id"],usuario).then(()=>{
    })
    this.toas.info("Sus datos se actualizarón correctamente","Actualización exitosa");
  }

}
