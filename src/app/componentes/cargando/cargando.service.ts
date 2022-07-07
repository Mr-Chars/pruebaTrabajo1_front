import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {

  public oculto="oculto";

  constructor() { }


  ocultarAnimacion()
   {
    this.oculto="oculto";
   }
   mostrarAnimacion()
   {
    this.oculto="";
    
   }
}
