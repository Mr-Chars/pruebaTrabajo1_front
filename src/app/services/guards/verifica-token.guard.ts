import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  
  constructor(
    public _usuarioService:UsuarioService,
    public router: Router
    )
  {
  
  }
  
  
  canActivate(): Promise<boolean> | boolean {
  
      
    let token=this._usuarioService.token;
    
    let dato_exp= this._usuarioService.token_exp;

    let expirado = this.expirado(parseFloat(dato_exp));

    
    if(expirado){

      this._usuarioService.logout();
      
      return false;
    }

    
    return this.verificaRenueva(parseFloat(dato_exp));
  }

  verificaRenueva(fechaExp:number): Promise<boolean>
  {

    return new Promise( (resolve, reject) =>{

      let tokenExp = new Date(fechaExp * 1000 );
      let ahora =new Date();

      ahora.setTime(ahora.getTime() + ( 1*30 *60 *1000) );

      // console.log(tokenExp);
      // console.log(ahora);

      if(tokenExp.getTime() > ahora.getTime() )
      {
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
                            .subscribe( () =>
                            {
                              resolve(true);
                            }, ()=>
                            {
                              this._usuarioService.logout();
                              reject(false);
                            });
      }

      resolve(true);
    });

  }
  


  expirado( fechaExp: number )
  {

    let ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora )
    {
      return true;
    }else{
      return false;
    }

  }
  
}
