import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ServicioService} from 'src/app/Servicios/servicio.service'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  Empleados: string[]=[];
  per="l";
  respuesta="";
  l="";
  submited=false;
  Datos: FormGroup;
  constructor( private ruta: Router,private fb: FormBuilder,private _Empleadoservice: ServicioService) {
    //constructor( private ruta: Router,private fb: FormBuilder,private _Empleadoservice: EmpleadoserviceService)
    this.Datos=this.fb.group({
      correo: ['',Validators.required],
      contra: ['',Validators.required],
    })
   }

  ngOnInit(): void {

  }
    verificar()
    {
      this.submited=true;
      const empleado: any = {
        correo: this.Datos.value.correo,
        contra: this.Datos.value.contra,
      }
      this._Empleadoservice.getNoAp(empleado.correo,empleado.contra).subscribe((data:any)=>{
        console.log(data);
        this.per= data[0]["Correo"];
        this.l= data[0]["Contraseña"];
        this.ver(this.per,empleado.correo,this.l,empleado.contra);
      })
    }

    ver(da: String,de:String,du:String,di: String)
    {
      if(da==de && du==di)
      {
        this.respuesta="Existe";
        this.ruta.navigate(['/ventana-inicio-principal/'+de]);
      }

    }
      
      /*.subscribe(data =>{
        this.Empleados=[];
        >
        data.forEach((element:any) => {
          //console.log(element.payload.doc.data()id);
          this.Empleados.push(
            {id: element.payload.doc.id,
            ...element.payload.doc.data()
          })  
        });
      })*/
    }