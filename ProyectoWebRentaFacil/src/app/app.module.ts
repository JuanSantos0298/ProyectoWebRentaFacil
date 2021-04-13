import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { EncabezadosComponent } from './encabezados/encabezados.component';
import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal/ventana-inicio-principal.component';
//Importamos para el servicio de Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BorrarUsuarioComponent } from './borrar-usuario/borrar-usuario/borrar-usuario.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ClienteCatalogoComponent } from './cliente-catalogo/cliente-catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuariosComponent,
    EncabezadosComponent,
    VentanaInicioPrincipalComponent,
    BorrarUsuarioComponent,
    IniciarSesionComponent,
    ClienteCatalogoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
