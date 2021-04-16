import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../data/cliente/usuario.service';
import { ToastrService } from 'ngx-toastr';;

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent implements OnInit {

  constructor( private toast: ToastrService, private usuarioService: UsuarioService) { }

  datos = this.usuarioService.Users;
  ngOnInit(): void {
  }

  async borrarUsuario(nombre: string): Promise<void>{
    this.toast.success("Usuario eliminado exitosamente");
    try {
      await this.usuarioService.eliminarUsuario(nombre);
    } catch (error) {
      console.log(error)
    }
  }
}
