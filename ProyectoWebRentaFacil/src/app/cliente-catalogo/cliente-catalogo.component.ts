import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/Servicios/servicio.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cliente-catalogo',
  templateUrl: './cliente-catalogo.component.html',
  styleUrls: ['./cliente-catalogo.component.css']
})
export class ClienteCatalogoComponent implements OnInit {
  casas: any[] = [];
  casasPro: any[] = [];
  correo: string | null;
  ocu = "";
  dato = "";
  va = '';
  im = '';

  casaB: FormGroup;
  casaa: any;

  constructor(private aRout: ActivatedRoute, private _casasService: ServicioService, private ruta: Router,
    private toast: ToastrService, private fb: FormBuilder) {
    this.correo = this.aRout.snapshot.paramMap.get('correo');
    //console.log(this.correo);
    this.casaB=fb.group({
      casa:[''],
    })
  }

  ngOnInit(): void {
    this.getveri();
    this.casasPropietario();
    this.getCasas()
  }
  
  getCasas() {
    this._casasService.getCasas().subscribe(data => {
      this.casas = [];
      data.forEach((element: any) => {
        this.casas.push({
          id: element.payload.doc.id,
          //imagen: element.payload.doc.img,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.casas);
    });
  }

  casasPropietario() {
    this._casasService.getCasasPro(this.correo).subscribe(data => {
      this.casasPro = [];
      data.forEach((element: any) => {
        this.casasPro.push({
          id: element.payload.doc.id,
          //imagen: element.payload.doc.img,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.casasPro);
    });
  }

  getveri() {
    console.log(this.correo);
    this._casasService.getOcu(this.correo).subscribe((data: any) => {
      this.ocu = data[0]["Ocupación"];
      this.im = data[0]["imagen"];
      this.compro(this.ocu, this.im);
    })
  }

  compro(ocu: string, ima: string) {
    if (ocu == "Cliente") {
      this.dato = "Cliente";
      this.im = ima;
      console.log(this.dato);
    }
    else {
      this.dato = "Propietario";
      this.im = ima;
      console.log(this.dato);
    }
    if (ocu == "Administrador") {
      this.dato = "Administrador";
      this.im = ima;
    }
  }

  reservar(id: string) {
    this.ruta.navigate(['/reservar/' + this.correo + '/' + id]);
  }

  eliminarCasa(id: string) {
    this._casasService.eliminarCasa(id).then(() => {
      console.log('Casa eliminada exitosamente');
    }).catch(error => {
      console.log(error);
    })
    this.toast.success("La casa fue eliminada con exito", "Casa eliminada");
  }

  Buscar()
  {
    if(this.casaB.value.casa=="")
    {
      this.getCasas();
      this.va="";
    }
    else
    {
      this.va="Busqueda";
      this.casaa=this.casaB.value.casa;
      this._casasService.buscar(this.casaa).subscribe((data:any)=>{
        this.casas=[];
        data.forEach((element: any) => {
          this.casas.push({
            id: element.payload.doc.id,
            //imagen: element.payload.doc.img,
            ...element.payload.doc.data(),
          })
        });
        console.log(this.casas);
      })
    }
  }

  BuscarPro()
  {
    if(this.casaB.value.casa=="")
    {
      this.casasPropietario();
      this.va="";
    }
    else
    {
      this.va="Busqueda";
      this.casaa=this.casaB.value.casa;
      this._casasService.buscarPropi(this.casaa,this.correo).subscribe((data:any)=>{
        this.casasPro=[];
        data.forEach((element: any) => {
          this.casasPro.push({
            id: element.payload.doc.id,
            //imagen: element.payload.doc.img,
            ...element.payload.doc.data(),
          })
        });
        console.log(this.casasPro);
      })
    }
  }
}

