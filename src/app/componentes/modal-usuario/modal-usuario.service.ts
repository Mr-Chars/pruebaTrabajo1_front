import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUsuarioService {

  public oculto="oculto";
  public opcion="";
  public idUsuario="";
  public role="";
  public estado="";

  constructor() { }

  ocultarModal()
   {
    this.oculto="oculto";
    this.opcion="";
    this.idUsuario="";
    this.role="";
    this.estado="";
    
   }
   mostrarModal(opcion="agregarUsuario",idUsuario=0,role="",estado="")
   {
    this.oculto="";
    this.opcion=opcion;
    this.idUsuario=""+idUsuario;
    this.role=""+role;
    this.estado=""+estado;
    
   }
   
}
