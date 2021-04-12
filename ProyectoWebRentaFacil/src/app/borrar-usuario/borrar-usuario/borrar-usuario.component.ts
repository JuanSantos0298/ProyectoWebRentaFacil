import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../data/cliente/usuario.service'

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent implements OnInit {

  constructor( private usuarioService: UsuarioService) { }

  datos = this.usuarioService.Users;
  ngOnInit(): void {
  }

  async borrarUsuario(nombre: string): Promise<void>{
    try {
      await this.usuarioService.eliminarUsuario(nombre);
      alert("Usuario Borrado");
    } catch (error) {
      console.log(error)
    }
  }
}
