import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../data/cliente/usuario.service';
import { ServicioService } from 'src/app/Servicios/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';;

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent implements OnInit {
  correo:any;
  ocu:any;
  im:any;

  constructor( private toast: ToastrService, private usuarioService: UsuarioService, private _elimina: ServicioService,
    private aRout: ActivatedRoute) { 
      this.correo = this.aRout.snapshot.paramMap.get('correo');
    }

  datos = this.usuarioService.Users;
  ngOnInit(): void {
    this.getveri();
  }

  async borrarUsuario(nombre: string): Promise<void>{
    this.toast.success("Usuario eliminado exitosamente");
    try {
      await this.usuarioService.eliminarUsuario(nombre);
    } catch (error) {
      console.log(error)
    }
  }

  getveri() {
    console.log(this.correo);
    this._elimina.getOcu(this.correo).subscribe((data: any) => {
      this.ocu = data[0]["Ocupación"];
      this.im = data[0]["imagen"];
    })
  }
}
