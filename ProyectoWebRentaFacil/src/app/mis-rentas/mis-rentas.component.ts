import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mis-rentas',
  templateUrl: './mis-rentas.component.html',
  styleUrls: ['./mis-rentas.component.css']
})
export class MisRentasComponent implements OnInit {

  correo = '';
  im: any;
  ocu: any;
  dato: any;
  respuesta: any;
  rentas: any[] = [];
  com: FormGroup;
  id: any

  constructor(private aRout: ActivatedRoute, private _rentas: ServicioService, private toas: ToastrService,
    private fb: FormBuilder) {
    this.correo = this.aRout.snapshot.paramMap.get('correo');

    this.com=fb.group({
      Comentario:[''],
    })
  }

  ngOnInit(): void {
    this.tabla();
    this.getveri();
  }

  tabla() {
    this._rentas.visualizarRenta(this.correo).subscribe((data: any) => {
      this.rentas = [];
      data.forEach((elemnt: any) => {
        this.rentas.push({
          iden: elemnt.payload.doc.id,
          ...elemnt.payload.doc.data(),
        })
      });
      console.log(this.rentas);
    })
  }

  eliminar(iden: string) {
    console.log(iden);
    this._rentas.eliminarrenta(iden).then(() => {
      console.log('Reservación eliminada exitosamente');
    }).catch(error => {
      console.log(error);
    })
    this.toas.success("La reservación se elimino", "Reservación eliminada");
  }


  getveri() {
    console.log(this.correo);
    this._rentas.getOcu(this.correo).subscribe((data: any) => {
      this.ocu = data[0]["Ocupación"];
      this.im = data[0]["imagen"];
    })
  }

  comentario(iden: string)
  {
    this.respuesta="Comentario";
    this.id=iden;
  }

  GuardarCom()
  {
    const co:any ={
      Comentario: this.com.value.Comentario,
      IdCasa: this.id,
      usuario: this.correo,
    }
    this._rentas.GuardaComentario(co);
    this.toas.success("Gracias por tu comentario","Comentario enviado exitosamente");

    console.log(co);
  }
}

