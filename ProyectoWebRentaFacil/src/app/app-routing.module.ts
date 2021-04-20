import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { AppComponent } from './app.component';
import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal/ventana-inicio-principal.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ClienteCatalogoComponent } from './cliente-catalogo/cliente-catalogo.component';
import {BorrarUsuarioComponent} from './borrar-usuario/borrar-usuario/borrar-usuario.component';
import {EditarCasaComponent} from './editar-casa/editar-casa.component';
import { AgregarpropiedadComponent } from './agregarpropiedad/agregarpropiedad.component';
import { ReservarComponent } from './reservar/reservar.component';



//Establezco las rutas de las paginas de los componentes que voy a usar para el cambio entre paginas
const routes: Routes = [
  //Ruta de inicio
  {
    path:'', component: VentanaInicioPrincipalComponent
  },
  //Ruta para el registro de usuarios
  {
    path: 'Registrarse', component: AgregarUsuariosComponent
  },
  //Ruta para inicar sesion
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
    //Ruta para inicio con sesion
    {path:'cliente-catalogo/:correo', component: ClienteCatalogoComponent},
    //Ruta para ver catalogo
    {path: 'cliente-catalogo', component: ClienteCatalogoComponent},
    //Ruta para borrar usuarios
    {path:'borrar-usuario',component: BorrarUsuarioComponent},
    //Ruta para agregar una casa
    {path:'agregar-casa/:correo',component: AgregarpropiedadComponent},
    //Ruta para editar una casa
    {path:'editar-casa/:correo/:id',component: EditarCasaComponent},
    //ruta para reservar
    {path: 'reservar/:correo/:id', component: ReservarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
