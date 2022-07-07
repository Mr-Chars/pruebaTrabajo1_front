import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';

import { SettingsService, UsuarioService } from '../../services/service.index';
import { DetalleUsuario } from '../../models/detalleUsuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  detalleUsuario:DetalleUsuario=new DetalleUsuario("","","","","","","","","","","");
  detalleUsuarioError:DetalleUsuario=new DetalleUsuario("","","","","","","","","","","");

  modelContrasenas={
    "email_usuario":"",
    "contrasena_actual":"",
    "contrasena_nueva":"",
    "contrasena_nueva_rep":"",
    "token":"",
  }

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  DataUsuario;

  estadoDetalleUsuario:string="visual";
  estadoUsuario:string="visual";
  emailUsuario:string;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _SettingsService: SettingsService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
   }

  ngOnInit() {
    
    this.cargarDetalleUsuario();
    setTimeout(()=>this.cargarDataUsuarioToker(),200);
  }

  cargarDataUsuarioToker()
  {
    this._usuarioService.obtenerDataToken(this._usuarioService.token).subscribe((data)=>{
        this.emailUsuario=data.tokenData.email;
    });
  }

  ActualizarContrasena()
  {

    if(!this.modelContrasenas.contrasena_actual)
    {
      swal.fire("Ingrese su contraseña actual", "", "error");
      return;
    }

    if(!this.modelContrasenas.contrasena_nueva || !this.modelContrasenas.contrasena_nueva_rep)
    {
      swal.fire("Ingrese su contraseña nueva", "", "error");
      return;
    }

    if(this.modelContrasenas.contrasena_nueva!=this.modelContrasenas.contrasena_nueva_rep)
    {
      swal.fire("La contraseña nueva no coincide con la validación", "", "error");
      return;
    }

    this.modelContrasenas.email_usuario=this.emailUsuario;
    this.modelContrasenas.token=this._usuarioService.token;

    
      this._usuarioService.cambiarContrasena(this.modelContrasenas)
      .subscribe((data:any)=>
      {
        if(data.ok)
        {
          swal.fire("Se ha modificado la contraseña", "", "success");
        }else{
          swal.fire(data.mensaje, "", "error");
        }
      });
    
    return;
    
  }

  cargarDetalleUsuario()
  {

    let data={
      "token":this._usuarioService.token
    }

    this._usuarioService.obtenerDetalleUsuario(data)
                    .subscribe((resp:any)=>
                    {
                      console.log(resp)
                      // let resp2=resp.data
                      
                      // if(resp2.length==1)
                      // {
                      //   this.detalleUsuario=resp.data[0];
                      // }
                      
                    });
                    
    
    return;
    
  }
  

  guardarDatos()
  {
    if(!this.validarDetalleUsuario())
    {
      return;
    }
    
    this.detalleUsuario.token=this._usuarioService.token;

    if(this.detalleUsuario.id>0)
    {
      // ID EXISTE POR LO TANTO SE ACTUALIZA
      this._usuarioService.actualizarDetalleUsuario(this.detalleUsuario)
                  .subscribe((detalleUsuario:any) => 
                    {
                      this.cargarDetalleUsuario();
                    });

    }else{
      // ID NO EXISTE POR LO TANTO SE CREA
      this._usuarioService.guardarDetalleUsuario(this.detalleUsuario)
                  .subscribe((detalleUsuario:any) => 
                    {
                      this.cargarDetalleUsuario();
                    });
    }
    
    this.mostrarModificarDetalleUsuario("visual")
    return;
    
    
    
    
    
                      
  }

  validarDetalleUsuario()
  {
    if(this.detalleUsuario.Nombres)
    {
      if(this.detalleUsuario.Nombres.length>40)
      {
        this.detalleUsuarioError.Nombres="Este campo solo permite ingresar 40 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.Nombres="";
      }
    }
    
    if(this.detalleUsuario.ApellidoPaterno)
    {
      if(this.detalleUsuario.ApellidoPaterno.length>40)
      {
        this.detalleUsuarioError.ApellidoPaterno="Este campo solo permite ingresar 40 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.ApellidoPaterno="";
      }
    }
    

    if(this.detalleUsuario.ApellidoMaterno)
    {
      if(this.detalleUsuario.ApellidoMaterno.length>40)
      {
        this.detalleUsuarioError.ApellidoMaterno="Este campo solo permite ingresar 40 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.ApellidoMaterno="";
      }
    }
    

    if(this.detalleUsuario.Domicilio)
    {
      if(this.detalleUsuario.Domicilio.length>700)
      {
        this.detalleUsuarioError.Domicilio="Este campo solo permite ingresar 700 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.Domicilio="";
      }
    }
    

    if(this.detalleUsuario.NCelular)
    {
      if(this.detalleUsuario.NCelular.length>9)
      {
        this.detalleUsuarioError.NCelular="Este campo solo permite ingresar 9 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.NCelular="";
      }
    }
    

    if(this.detalleUsuario.NTelefono)
    {
      if(this.detalleUsuario.NTelefono.length>12)
      {
        this.detalleUsuarioError.NTelefono="Este campo solo permite ingresar 12 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.NTelefono="";
      }
    }
    

    if(this.detalleUsuario.PaisNacimiento)
    {
      if(this.detalleUsuario.PaisNacimiento.length>100)
      {
        this.detalleUsuarioError.PaisNacimiento="Este campo solo permite ingresar 100 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.PaisNacimiento="";
      }
    }
    

    if(this.detalleUsuario.CiudadNacimiento)
    {
      if(this.detalleUsuario.CiudadNacimiento.length>100)
      {
        this.detalleUsuarioError.CiudadNacimiento="Este campo solo permite ingresar 100 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.CiudadNacimiento="";
      }
    }
    

    if(this.detalleUsuario.AcercaDeMi)
    {
      if(this.detalleUsuario.AcercaDeMi.length>900)
      {
        this.detalleUsuarioError.AcercaDeMi="Este campo solo permite ingresar 900 caracteres.";
        return false;
      }else{
        this.detalleUsuarioError.AcercaDeMi="";
      }
    }
    
    
    

    return true;
  }

  mostrarModificarDetalleUsuario(nuevoEstado,actualizarData=false)
  {
    if(actualizarData)
    {
      this.cargarDetalleUsuario();
    }
    this.estadoDetalleUsuario=nuevoEstado;
  }

  mostrarModificarUsuario(nuevoEstado)
  {
    this.estadoUsuario=nuevoEstado;
  }

}
