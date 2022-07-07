import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app-routing.module';

// Modulos
import { PagesModule } from './pages/pages.module';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// Servicios

import { ServiceModule } from './services/service.module';



// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { sharedModule } from './shared/shared.module';
import { RecuperarClaveComponent } from './login/recuperar-clave/recuperar-clave.component';
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentesModule } from './componentes/componentes.module';
import { ModalUsuarioComponent } from './componentes/modal-usuario/modal-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    RecuperarClaveComponent,
    CargandoComponent,
    ModalUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    //PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    sharedModule,
    ComponentesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
