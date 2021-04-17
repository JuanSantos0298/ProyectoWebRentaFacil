import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregarpropiedad',
  templateUrl: './agregarpropiedad.component.html',
  styleUrls: ['./agregarpropiedad.component.css']
})
export class AgregarpropiedadComponent implements OnInit {

  correo="";

  //Crearemos el objeto del tipo formGroup
  formularioPropiedad: FormGroup;

  //Obtenemos la URL de la imagen
  urlImagen: string = ''

  //Inyectamos el form-builder
  //Inyectamos el Firestore
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore,private aRout: ActivatedRoute,
    private toast: ToastrService){
    this.correo=this.aRout.snapshot.paramMap.get('correo');

   }

  ngOnInit(): void {
    this.formularioPropiedad = this.fb.group({
      Ubicacion: ['', Validators.required],
      Municipio: ['' , Validators.required],
      Estado: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Cuartos:['', Validators.required],
      Costo:['', Validators.required],
      Estrellas:['',Validators.required],
      img:['', Validators.required],
      Dueño:[this.correo]   
    })
  }


  AgregarPropiedad(){
    console.log(this.formularioPropiedad.value)

    //Cambiamos el nombre de la imagen
    this.formularioPropiedad.value.img = this.urlImagen

    //conexion con la coleccion 
    this.db.collection('casas').add(this.formularioPropiedad.value).then((finalizado)=>{
      console.log('Registro creado. ')
    })
    this.toast.success("Casa añadida exitosamente");
  }

  //Viendo como se agregan las imagenes 
  subirImagen(evento){

    //Establecemos el nombre con la fecha en que se sube para que cada vez que se suba una imagen no se sobreescriba 
    let nombre = new Date().getTime().toString()
    let archivo = evento.target.files[0]

    console.log(nombre)

    //Establecemos la extension para que cada que se suba la imagen se cree otra nueva

    console.log(archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.')))

    let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))

    //Establecemos en la ruta y ademas como se van a llamar las imagenes
    let ruta = 'propietario/' + nombre + extension;
    const referencia = this.storage.ref(ruta)
    const tarea = referencia.put(archivo)

    //Verificamos que se haya subido la imagen
    tarea.then((objeto)=>{
      console.log('La imagen se ha subido a la base de datos. ')

      //Obtenemos la URL para jalar las imagenes a la base de datos
      referencia.getDownloadURL().subscribe((url)=>{
        console.log(url)
        this.urlImagen = url
    })

    })

  }

}
