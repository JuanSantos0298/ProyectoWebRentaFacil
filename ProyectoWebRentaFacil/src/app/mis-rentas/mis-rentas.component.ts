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
      console.log(data);
      this.rentas=[];
      data.forEach((elemnt:any)=>{
        this.rentas.push({
          ...elemnt.payload.doc.data(),
        })
      });
      console.log(this.rentas);
    })
  }

}
