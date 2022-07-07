import { Component } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent {

  email_recuperar = "";

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  recuperar() {
    console.log(this.email_recuperar);

    this._usuarioService.recuperarClave(this.email_recuperar)
      .subscribe((response) => {
        if (!response.ok) {
          swal.fire("Se produjo un error", response.mensaje, "error");
          console.log(response);
          return;
        }
        swal.fire("Por favor revise su correo para teminar con la recuperación de contraseña", "", "success");
        this.router.navigate(["/dashboard"])
      });
  }

}
