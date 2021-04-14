import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importaremos AngularFirestore y AngularFireStorage
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
  
})
export class AgregarUsuariosComponent implements OnInit {

  formularioUsuario:FormGroup;

  //Establezco la validacion para el formulario
  constructor(private toars: ToastrService,private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(){
    this.formularioUsuario = this.fb.group({
      //le pasaremos objetos
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Telefono: [''],
      Cuentabancaria: ['', Validators.required],
      CVC: ['', Validators.required],
      Correo: ['', Validators.compose([Validators.required,Validators.email])],
      Contraseña: ['', Validators.required],
      Ocupación: ['',Validators.required],
    })
  }


  agregar(){
    console.log(this.formularioUsuario.value);
    this.db.collection('Usuarios').add(this.formularioUsuario.value).then((finalizado)=>{
    })
    this.toars.success("Registro exitoso");

  }

}
