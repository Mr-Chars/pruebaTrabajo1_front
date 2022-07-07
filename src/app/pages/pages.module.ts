import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { sharedModule } from '../shared/shared.module';

import { FormsModule } from "@angular/forms";

import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { EmpleadosComponent } from './empleados/empleados.component';



@NgModule({
    declarations: [
        DashboardComponent,
        PerfilComponent,
        UsuariosComponent,
        SettingsComponent,
        EmpleadosComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        sharedModule,
        PAGES_ROUTES,
        ComponentesModule,
        FormsModule,
    ]
})
export class PagesModule { }