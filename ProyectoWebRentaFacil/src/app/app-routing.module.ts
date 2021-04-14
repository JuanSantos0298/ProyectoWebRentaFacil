import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { AppComponent } from './app.component';
import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal/ventana-inicio-principal.component';
import { BorrarUsuarioComponent } from './borrar-usuario/borrar-usuario/borrar-usuario.component';

//Establezco las rutas de las paginas de los componentes que voy a usar para el cambio entre paginas
const routes: Routes = [
  //Ruta de inicio
  {
    path:'', component: VentanaInicioPrincipalComponent
  },
  //Ruta para el registro de usuarios
  {
    path: 'Registrarse', component: AgregarUsuariosComponent,
  },
  //Ruta para eliminar usuario
  {
    path: 'Eliminar', component: BorrarUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
