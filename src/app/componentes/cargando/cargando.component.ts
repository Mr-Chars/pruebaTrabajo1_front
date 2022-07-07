import { Component, OnInit } from '@angular/core';
import { CargandoService } from './cargando.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html'
})
export class CargandoComponent {

  constructor(
    public _Cargando: CargandoService
  ) { }

}
