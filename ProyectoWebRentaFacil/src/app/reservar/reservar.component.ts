import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { ServicioService } from 'src/app/Servicios/servicio.service';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  correo: string | null;
  id: string | null;
  casaResev: any[] = [];
  estado = "";
  dueño = "";
  municipio = "";
  ubicacion = "";
  cvv = "";
  cuenta = "";
  formularioReserva: FormGroup;
  //Variables para datos casos
  numc:any;
  coment: any;
  idcasa:any;
  im:any;
  im2:any;
  ubi: any;
  cost:any;
  estrellas:any;
  esta: any;
  muni: any;
  descripcion:any;
  cuart:any;
  due:any;
  comentarios: any[]=[];
  constructor(private ruta: Router, private toastr: ToastrService, private aRout: ActivatedRoute, 
    private _ReservService: ServicioService, private fb: FormBuilder) {
      this.correo = this.aRout.snapshot.paramMap.get('correo');
      this.id = this.aRout.snapshot.paramMap.get('id');

      this.formularioReserva = fb.group({
      Cuentabancaria: ['',Validators.required],
      CVC: ['', Validators.required],
      Correo: [this.correo],
      entrada: ['', Validators.required],
      salida: ['', Validators.required]
    })
     }

  ngOnInit(): void {
    this.obtenerdator();
    this.obtenerComentarios();
  }

  //funcion principal para reservar
  reservar() {
    combineLatest(this._ReservService.getdatosBanc(this.correo), this._ReservService.getCasa(this.id)).subscribe(value => {
      const datos = (value[0])[0];
      const cas = value[1];
      console.log(datos,cas);
      this.estado = cas.Estado;
      this.dueño = cas.Dueño;
      this.municipio = cas.Municipio;
      this.ubicacion = cas.Ubicacion;
      this.cvv = datos.CVC;
      this.cuenta = datos.Cuentabancaria;
      this.llenar(this.cuenta);
      this.verificarDatos(this.correo, this.formularioReserva.value.Correo, this.cuenta, this.formularioReserva.value.Cuentabancaria, this.cvv, this.formularioReserva.value.CVC);
    })
  }

  //funcion para verficar datos
  verificarDatos(value1: string, value2: string, value3: string, value4: string, value5: string, value6: string,) {

    if (value1 == value2) {
      if (value3 == value4) {
        if (value5 == value6) {
          this._ReservService.crearReser(this.id, this.dueño, this.correo, this.estado, this.municipio, this.ubicacion, this.formularioReserva.value.entrada, this.formularioReserva.value.salida);
          this.toastr.info("Reserva exitosa");
          this.cancelar();
        } else {
          this.toastr.error("El CVV no coincide");
        }
      } else {
        this.toastr.error("La cuenta bancaria no existe");
      }
    } else {
      this.toastr.error("Correo no coincide");
    }
    this.ruta.navigate(['/mis-rentas/'+this.correo]);
  }

  llenar(a: any)
  {
    this.cuenta=a;
    console.log(this.cuenta);
  }

  //funcion de cancelar reserva
  cancelar() {
    this.ruta.navigate(['/cliente-catalogo/' + this.correo]);
  }

  //Obtención de datos comentarios 
  obtenerdator()
  {
    this._ReservService.Cacomentarios(this.id).subscribe((data:any)=>{
      console.log(data);
      this.coment=data[0]["Comentario"];
      this.idcasa=data[0]["IdCasa"];
      this.obtenerdatoscasa(this.idcasa);
    })
  }

  obtenerComentarios(){
    this._ReservService.Cacomentarios(this.id).subscribe((data:any) => {
      this.comentarios=[];
      data.forEach((element:any) => {
        this.comentarios.push({
          
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.comentarios);
     
      this.idcasa=this.comentarios[0]["IdCasa"];
      this.obtenerdatoscasa(this.idcasa);
    });
  }
  obtenerdatoscasa(id: string)
  {
    this._ReservService.CaDatos(id).subscribe((data:any)=>{
      console.log(data);
      this.im=data["img"];
      this.im2=data["img2"];
      this.ubi=data["Ubicacion"];
      this.esta=data["Estado"];
      this.muni=data["Municipio"];
      this.estrellas=data["Estrellas"];
      this.cost=data["Costo"];
      this.descripcion=data["Descripcion"];
      this.cuart=data["Cuartos"];
      this.due=data["Dueño"];
      console.log(this.muni);
    })
  }
}
