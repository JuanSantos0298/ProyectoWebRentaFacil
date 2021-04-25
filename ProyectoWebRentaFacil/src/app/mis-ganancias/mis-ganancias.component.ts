import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from '../Servicios/servicio.service';

@Component({
  selector: 'app-mis-ganancias',
  templateUrl: './mis-ganancias.component.html',
  styleUrls: ['./mis-ganancias.component.css']
})
export class MisGananciasComponent implements OnInit {

  correo='';
  rentas: any[]=[];

  constructor(private aRout: ActivatedRoute,private _ganancias:ServicioService,private toas: ToastrService) {
    this.correo = this.aRout.snapshot.paramMap.get('correo');
   }

  ngOnInit(): void {
    this.tabla();
  }

  tabla()
  {
    this._ganancias.visualizarGanancias(this.correo).subscribe((data: any)=>{
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

}
