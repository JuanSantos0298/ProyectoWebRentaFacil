import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ServicioService } from '../Servicios/servicio.service';

@Component({
  selector: 'app-mis-ganancias',
  templateUrl: './mis-ganancias.component.html',
  styleUrls: ['./mis-ganancias.component.css']
})
export class MisGananciasComponent implements OnInit {

  correo='';
  rentas: any[]=[];
  mapRentas = new Map();
  arrayObjetos: any;
  total:Observable<number>;

  constructor(private aRout: ActivatedRoute,private _ganancias:ServicioService,private toas: ToastrService) {
    this.correo = this.aRout.snapshot.paramMap.get('correo');
   }

  ngOnInit(): void {
    this.tabla();
  }

  //funcion para obtener los datos de las casas reservadas
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
      this.map(this.rentas);
      //console.log(this.rentas);
    })
  }

  //funcion para mapear los datos que se mostraran en ganancias
  map(value: any){
    value.forEach(element => {
      if (!this.mapRentas.has(element.Ubicacion)) {
        this.mapRentas.set(element.Ubicacion, {Ubicacion: element.Ubicacion, fecha: ["entrada: " + element.Entrada + " salida:" + element.Salida], estado: element.Estado, municipio: element.Municipio, total: element.Pago, rentas: ["$" + element.Pago]})
      } else {
        const obj = this.mapRentas.get(element.Ubicacion);
        obj.total = obj.total + element.Pago;
        obj.rentas.push("\n $" + element.Pago);
        obj.fecha.push("\n" + "entrada: " + element.Entrada + " salida: " + element.Salida)
        this.mapRentas.set(element.Ubicacion,obj);
      }
    });

    this.arrayObjetos = Array.from(this.mapRentas.values());
    console.log(this.arrayObjetos);
    this.Totales(this.arrayObjetos);
  }

  //funcion para obtener las ganancias totales por casas
  Totales(value: any){
  this.total = value.reduce((prev, curr) => prev.total + curr.total);
  console.log(this.total);
  }

}
