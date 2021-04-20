import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ServicioService} from 'src/app/Servicios/servicio.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-catalogo',
  templateUrl: './cliente-catalogo.component.html',
  styleUrls: ['./cliente-catalogo.component.css']
})
export class ClienteCatalogoComponent implements OnInit {
  casas: any[]=[];
  casasPro: any[]=[];
  correo:string | null;
  ocu="";
  dato="";
  constructor(private aRout: ActivatedRoute, private _casasService: ServicioService, private ruta: Router,
    private toast: ToastrService) {
    this.correo=this.aRout.snapshot.paramMap.get('correo');
    //console.log(this.correo);
  }

  ngOnInit(): void {
      this.casasPropietario();
      this.getCasas()
      this.getveri();
  }
  getCasas(){
    this._casasService.getCasas().subscribe( data => {
      this.casas=[];
      data.forEach((element:any) => {
        this.casas.push({
          id: element.payload.doc.id,
          //imagen: element.payload.doc.img,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.casas);
    });
  }

  casasPropietario()
  {
    this._casasService.getCasasPro(this.correo).subscribe( data => {
      this.casasPro=[];
      data.forEach((element:any) => {
        this.casasPro.push({
          id: element.payload.doc.id,
          //imagen: element.payload.doc.img,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.casasPro);
    });
  }
  
  getveri()
  {
    console.log(this.correo);
    this._casasService.getOcu(this.correo).subscribe((data:any) =>
      {
        this.ocu=data[0]["Ocupación"];
        this.compro(this.ocu);
      })
  }

  compro(ocu: string)
  {
    if(ocu == "Cliente")
    {
      this.dato="Cliente";
      console.log(this.dato);
    }
    else
    {
      this.dato="Propietario";
      console.log(this.dato);
    }
  }

  reservar(id:string){
    this.ruta.navigate(['/reservar/'+this.correo+'/'+id]);
  }

  eliminarCasa(id:string){
    this._casasService.eliminarCasa(id).then(()=> {
      console.log('Casa eliminada exitosamente');
    }).catch(error => {
      console.log(error);
    })
    this.toast.success("La casa fue eliminada con exito","Casa eliminada");
  }
}
