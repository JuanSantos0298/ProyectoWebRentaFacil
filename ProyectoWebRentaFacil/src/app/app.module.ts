import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { EncabezadosComponent } from './encabezados/encabezados.component';
import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal/ventana-inicio-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuariosComponent,
    EncabezadosComponent,
    VentanaInicioPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
