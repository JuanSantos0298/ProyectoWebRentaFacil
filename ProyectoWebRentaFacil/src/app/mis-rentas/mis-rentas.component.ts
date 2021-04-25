import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ServicioService} from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-rentas',
  templateUrl: './mis-rentas.component.html',
  styleUrls: ['./mis-rentas.component.css']
})
export class MisRentasComponent implements OnInit {

  correo='';
  rentas: any[]=[];

  constructor(private aRout: ActivatedRoute,private _rentas:ServicioService,private toas: ToastrService) {
    this.correo = this.aRout.snapshot.paramMap.get('correo');
   }

  ngOnInit(): void {
    this.tabla();
  }

  tabla()
  {
    this._rentas.visualizarRenta(this.correo).subscribe((data: any)=>{
      this.rentas=[];
      data.forEach((elemnt:any)=>{
        this.rentas.push({
          iden: elemnt.payload.doc.id,
          ...elemnt.payload.doc.data(),
        })
      });
      console.log(this.rentas);
    })
  }

  eliminar(iden:string)
  {
    console.log(iden);
    this._rentas.eliminarrenta(iden).then(()=> {
      console.log('Reservación eliminada exitosamente');
    }).catch(error => {
      console.log(error);
    })
    this.toas.success("La reservación se elimino","Reservación eliminada");
  }

}
