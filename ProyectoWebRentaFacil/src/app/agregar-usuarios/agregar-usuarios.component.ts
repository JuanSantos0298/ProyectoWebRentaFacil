import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
  
})
export class AgregarUsuariosComponent implements OnInit {

  formularioUsuario:FormGroup;

  //Establezco la validacion para el formulario
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.formularioUsuario = this.fb.group({
      //le pasaremos objetos
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Telefono: [''],
      Cuentabancaria: ['', Validators.required],
      CVC: [''],
      Correo: ['', Validators.compose([Validators.required,Validators.email])],
      Contrasena: ['', Validators.required],
    })
  }


  agregar(){
    console.log(this.formularioUsuario.value);
  }

}
