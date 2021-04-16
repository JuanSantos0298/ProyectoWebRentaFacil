import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ServicioService} from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';

//necesidad jaja
import { Observable } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-casa',
  templateUrl: './editar-casa.component.html',
  styleUrls: ['./editar-casa.component.css']
})
export class EditarCasaComponent implements OnInit {
  image: any;
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


  constructor(private form: FormBuilder,private toas: ToastrService,private ruta: Router, private _casa: ServicioService
    ,private aRout: ActivatedRoute, private firestorage: AngularFireStorage) {
    this.Datos=this.form.group({
      Costo: [''],
      Cuartos: [''],
      Descripcion: [''],
      img: [''],
    })
    this.id=this.aRout.snapshot.paramMap.get('id');
    this.correo=this.aRout.snapshot.paramMap.get('correo');

  }

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos()
  {
    this._casa.datoscasa(this.id).subscribe(data=>{
      console.log(data.payload.data()["Descripcion"]);
      this.Datos.setValue(
        {
          Descripcion: data.payload.data()["Descripcion"],
          Costo: data.payload.data()["Costo"],
          Cuartos: data.payload.data()["Cuartos"],
          img: data.payload.data()["img"],
        })
    })
  }

  carga(event: any): void
  {
    this.image=event.target.files[0];
    this.noim=event.target.files[0]["name"];
    this.subircasa(this.image,this.noim);
    this.toas.info("imagen cargando");
  }

  subircasa(imag: File,no:string)
  {
    this.firepath='images/'+no;
    const fileref = this.firestorage.ref(this.firepath);
    const task = this.firestorage.upload(this.firepath,imag);
    task.snapshotChanges().pipe(
      finalize(()=>{
        fileref.getDownloadURL().subscribe(urlimage =>{
          this.dowload = urlimage;
          this.añ(urlimage);
        })
      })
    ).subscribe();
  }

  
  añ(a: string)
  {
    this.ur= a;
  }


  actualizar()
  {
    const casa: any ={
      Descripcion: this.Datos.value.Descripcion,
      Costo: this.Datos.value.Costo,
      Cuartos: this.Datos.value.Cuartos,
      img: this.ur,
    }
    this._casa.ActualizarCasa(this.id,casa).then(()=>{
      this.toas.info("La casa se actualizo correctamente","Casa actualizada");
    })
  }

}
