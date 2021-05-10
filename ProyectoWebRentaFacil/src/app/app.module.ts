///modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Importamos para el servicio de Firebase
import { AngularFireModule } from '@angular/fire';
import { ToastrModule } from 'ngx-toastr';

//enviroments
import { environment } from '../environments/environment';

//componentes
import { AppComponent } from './app.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { EncabezadosComponent } from './encabezados/encabezados.component';
import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal/ventana-inicio-principal.component';
import { BorrarUsuarioComponent } from './borrar-usuario/borrar-usuario/borrar-usuario.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ClienteCatalogoComponent } from './cliente-catalogo/cliente-catalogo.component';
import { EditarCasaComponent } from './editar-casa/editar-casa.component';
import { AgregarpropiedadComponent } from './agregarpropiedad/agregarpropiedad.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReservarComponent } from './reservar/reservar.component';
import { MisRentasComponent } from './mis-rentas/mis-rentas.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MisGananciasComponent } from './mis-ganancias/mis-ganancias.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuariosComponent,
    EncabezadosComponent,
    VentanaInicioPrincipalComponent,
    BorrarUsuarioComponent,
    IniciarSesionComponent,
    ClienteCatalogoComponent,
    EditarCasaComponent,
    AgregarpropiedadComponent,
    ReservarComponent,
    MisRentasComponent,
    EditarPerfilComponent,
    MisGananciasComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    
    //Importamos FireStorage para subir las imagenes
    AngularFireStorageModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
