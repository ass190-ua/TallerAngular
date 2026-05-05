import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaComponent } from './lista/lista.component';
import { TareaComponent } from './tarea/tarea.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,       // Componente raíz de la aplicación
    ListaComponent,     // Componente que renderiza cada tarjeta de lista
    TareaComponent      // Componente que renderiza cada tarea individual
  ],
  imports: [
    BrowserModule,      // Necesario para que la aplicación corra en el navegador web
    AppRoutingModule,   // Módulo para el enrutamiento (si se usan múltiples páginas/vistas)
    NgbModule,          // Integración de ng-bootstrap (para componentes visuales como modales)
    FormsModule,        // Necesario para los formularios y el enlace bidireccional [(ngModel)]
    HttpClientModule    // Permite hacer peticiones HTTP al servidor (backend REST)
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente por el que arranca la aplicación
})
export class AppModule { }
