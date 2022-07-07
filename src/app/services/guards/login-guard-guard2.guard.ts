import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard2Guard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }

  canActivate() {

    return this._usuarioService.estaLogueado().map((data) => {
      if (data == true) {
        console.log("Está logueado");
        this.router.navigate(['/empleados']);
        return false;

      } else {

        return true;
      }
    });




  }

}
