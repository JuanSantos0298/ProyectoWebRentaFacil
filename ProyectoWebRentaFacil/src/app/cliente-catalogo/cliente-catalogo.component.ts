import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ServicioService} from 'src/app/Servicios/servicio.service'


@Component({
  selector: 'app-cliente-catalogo',
  templateUrl: './cliente-catalogo.component.html',
  styleUrls: ['./cliente-catalogo.component.css']
})
export class ClienteCatalogoComponent implements OnInit {
  casas: any[]=[];
  constructor(private _casasService: ServicioService) {

  }

  ngOnInit(): void {
      this.getCasas()
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

}
