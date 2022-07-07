import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ModalEmpleadoComponent } from './modal-empleado/modal-empleado.component';

@NgModule({
  declarations: [
    // ModalUsuarioComponent,

    ModalEmpleadoComponent
  ],
  exports: [
    // ModalUsuarioComponent,
    ModalEmpleadoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ComponentesModule { }
