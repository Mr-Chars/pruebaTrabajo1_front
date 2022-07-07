import { Injectable, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { DetalleUsuario } from 'src/app/models/detalleUsuario.model';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'

})
export class UsuarioService {


  usuarioData: Usuario;

  DetalleUsuario: DetalleUsuario;
  token: string;
  token_exp: string;


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();

  }

  @Output() refreshUsuarios: EventEmitter<boolean> = new EventEmitter();
  __refreshUsuarios() {
    this.refreshUsuarios.emit();
  }

  getUsers(dataEnviar) {
    let url = URL_SERVICIOS + "getUsuarios?page=" + dataEnviar.page + "&buscar=" + dataEnviar.buscar + "&criterio=" + dataEnviar.criterio + "&token=" + dataEnviar.token;
    // console.log(url_busqueda_data_usua);
    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  actualizarUsuario(data_enviar) {
    let url = URL_SERVICIOS + "usuarios/actualizarUsuario";

    return this.http.post(url, data_enviar)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {

        if (err) {
          swal.fire("error", "0", "error");
        }
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);


      });
  }

  eliminarUsuario(data_enviar) {
    // let url = URL_SERVICIOS+"usuarios/eliminarUsuario";
    let url = URL_SERVICIOS + "eliminarUsuario";

    return this.http.post(url, data_enviar)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {

        if (err) {
          swal.fire("error", "0", "error");
        }
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);


      });
  }

  renuevaToken() {
    // let url=URL_SERVICIOS+ "login/renuevaToken/"+this.token;
    let url = URL_SERVICIOS + "login_renuevaToken&data1=" + this.token;

    return this.http.get(url)
      .map((resp: any) => {
        this.token = resp.Token;
        this.token_exp = resp.Token_expiracion;
        this.usuarioData = resp.usuario;

        localStorage.setItem("token", this.token);
        localStorage.setItem("token_exp", this.token_exp);

        console.log("Token renovado");

        return true;
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(["/login"]);
        swal.fire("No se pudo renovar el token", "No fué posible renovar token", "error");
        return of(err);
      });
  }


  estaLogueado() {
    let d_token = this.token;

    if (!d_token) {
      d_token = "0";
    }

    // let url=URL_SERVICIOS+ "login/obtener_dataToken?token="+d_token;
    let url = URL_SERVICIOS + "loginObtenerDataToken?data1=" + d_token;

    return this.http.get(url)
      .map((resp: any) => {
        return resp.ok;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);
      });

  }

  obtenerDataToken(token) {
    // let url1=URL_SERVICIOS+ "login/obtener_dataToken?token="+token;
    // let url1 = URL_SERVICIOS + "obtener_dataToken&token=" + token;
    let url1 = URL_SERVICIOS + "obtener_dataToken?token=" + token;

    return this.http.get(url1)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);
      });
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.token_exp = localStorage.getItem("token_exp");
    } else {
      this.token = "";
      this.token_exp = "";
      this.usuarioData = null;

      this.logout();
    }
  }

  crearUsuario(usuario: Usuario) {
    // let url = URL_SERVICIOS+"usuarios/agregarUsuario";
    let url = URL_SERVICIOS + "agregarUsuario";

    return this.http.post(url, usuario)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {

        if (err) {
          swal.fire("Se produjo un error", "0", "error");
        }
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);


      });
  }


  buscarUsuario(usuario) {
    // let url=URL_SERVICIOS+ "usuarios/obtenerUsuarioPorEmail?email="+usuario.email;
    // let url = URL_SERVICIOS + "usuarios_obtenerUsuarioPorEmail&data1=" + usuario.email;
    let url = URL_SERVICIOS + "usuarios_obtenerUsuarioPorEmail?data1=" + usuario.email;

    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);
      });
  }

  recuperarClave(email_recuperar) {
    let url_email_recuperar = URL_SERVICIOS + "usuarios/cambiarClave/" + email_recuperar + "/";

    return this.http.get(url_email_recuperar)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);
      });
  }

  cambiarContrasena(modelContrasenas) {
    // let url= URL_SERVICIOS+ "usuarios/cambiarContrasena";
    let url = URL_SERVICIOS + "usuarioCambiarContrasena";

    return this.http.post(url, modelContrasenas)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");
        return of(err);
      });
  }

  login(usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "login";
    // let url= URL_SERVICIOS+ "login/";

    return this.http.post(url, usuario)
      .map((resp: any) => {
        if (!resp.ok) {
          return resp;
        }

        this.guardarStorage(resp.Token, resp.Token_expiracion, resp.usuario);

        return resp;
      })
      .catch(err => {

        swal.fire("Error en el login", err.error.mensaje, "error");
        return of(err);
      });
  }

  guardarStorage(token: string, token_exp: string, usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("token_exp", token_exp);

    this.token = token;
    this.token_exp = token_exp;
    this.usuarioData = usuario;
  }

  logout() {
    this.token = "";
    this.token_exp = "";
    this.usuarioData = null;

    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");

    this.router.navigate(["/login"]);
  }


  guardarDetalleUsuario(detalleUsuario) {
    let url = URL_SERVICIOS + "detalleUsuario/guardarDetalleUsuario";

    return this.http.post(url, detalleUsuario)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("+++++++++++++++++++++++++");
        console.log(err);
        console.log("+++++++++++++++++++++++++");
        return of(err);
      });
  }


  obtenerDetalleUsuario(data) {
    // let url=URL_SERVICIOS+ "detalleUsuario/obtenerPorIdUsuario?token="+data.token;
    let url = URL_SERVICIOS + "obtenerDetalleUsuarioByIdUsuario&token=" + data.token;

    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);
      });
  }

  actualizarDetalleUsuario(detalleUsuario) {
    let url = URL_SERVICIOS + "detalleUsuario/actualizarDetalleUsuario";

    return this.http.post(url, detalleUsuario)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("+++++++++++++++++++++++++");
        console.log(err);
        console.log("+++++++++++++++++++++++++");
        return of(err);
      });
  }


  buscarUsuarioLive(data) {
    // let url=URL_SERVICIOS+ "usuarios/obtenerUsuariolive?offset="+data.offset+"&limit="+data.limit+"&busqueda="+data.busqueda+"&token="+data.token;
    let url = URL_SERVICIOS + "obtenerUsuariolive&offset=" + data.offset + "&limit=" + data.limit + "&busqueda=" + data.busqueda + "&token=" + data.token;

    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("+++++++++++++++++++++++++");
        console.log(err);
        console.log("+++++++++++++++++++++++++");
        return of(err);
      });
  }

  usuarioUpdate(usuario) {
    let url = URL_SERVICIOS + "usuarioUpdate";


    return this.http.post(url, usuario)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");

        return of(err);


      });
  }



}
