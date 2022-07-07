import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router)
  {

  }

  canActivate(){

    return this._usuarioService.estaLogueado().map((data)=>{
      if(data==true){
          return true;
      }else{
        console.log("BLOQUEADO POR EL GUARD");
        this._usuarioService.logout();
          return false;
      }
  });

  

    
  }
  
}
