import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEmpleadoService {

  public oculto = "oculto";
  public idEmpleado = 0;

  constructor() { }

  ocultarModal() {
    this.oculto = "oculto";
  }

  mostrarModal(idEmpleado = 0) {
    this.oculto = "";
    this.idEmpleado = idEmpleado;
  }
}
