import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class GuardAdminGuard implements CanActivate {




  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }


  canActivate() {

    return this._usuarioService.obtenerDataToken(this._usuarioService.token)
      .map((data) => {
        console.log(data);
        
        // if(data.usuario.rol=="ADMINISTRADOR"){
        if (data.tokenData.rol == "ADMINISTRADOR") {
          return true;
        } else {
          this.router.navigate(['/empleados']);
          return false;
        }
      });

  }
}
