import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  Empleados: string[] = [];
  no = "";
  ap = "";
  per = "l";
  respuesta = "";
  l = "";
  submited = false;
  Datos: FormGroup;
  constructor(private toastr: ToastrService, private ruta: Router, private fb: FormBuilder, private _Empleadoservice: ServicioService) {
    //constructor( private ruta: Router,private fb: FormBuilder,private _Empleadoservice: EmpleadoserviceService)
    this.Datos = this.fb.group({
      correo: ['', Validators.required],
      contra: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }
  verificar() {
    this.submited = true;
    const empleado: any = {
      correo: this.Datos.value.correo,
      contra: this.Datos.value.contra,
    }
    console.log(empleado);
    this._Empleadoservice.getNoAp(empleado.correo, empleado.contra).subscribe((data: any) => {
      console.log(data);
      if(data==0)
      {
        this.per="No existe";
        console.log(this.per);
      }
      this.per = data[0]["Correo"];
      this.l = data[0]["Contraseña"];
      this.no = data[0]["Nombre"];
      this.ap = data[0]["Apellido"];
      this.ver(this.per, empleado.correo, this.l, empleado.contra, this.no, this.ap);
    })
  }

  ver(da: String, de: String, du: String, di: String, no: string, ap: string) {
    if (da == de && du == di) {
      this.respuesta = "Existe";
      this.toastr.info("Bienvenido/a " + no + " " + ap, "");
      this.ruta.navigate(['/cliente-catalogo/' + de]);
    }
  }
}