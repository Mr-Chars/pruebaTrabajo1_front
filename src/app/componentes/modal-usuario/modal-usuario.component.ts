import { Component, DoCheck } from '@angular/core';
import { SettingsService, UsuarioService } from 'src/app/services/service.index';
import { ModalUsuarioService } from './modal-usuario.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html'
})
export class ModalUsuarioComponent implements DoCheck {

  optionCambioPass = 0;

  n_vez = 0;
  n_vez2 = 0;
  USUARIO_DATA =
    {
      "id": "",
      "email": "",
      "password": "",
      "rol": "COLABORADOR",
      "token": "",
    };

  PASSWORD_DATA =
    {
      "token": "",
      "idUsuario": "",
      "role": "",
      "estado": "",
      "new_password": "",
      "new_password2": ""
    };

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  constructor(
    public __modalUsuarioService: ModalUsuarioService,
    public __usuarioService: UsuarioService,
    public _SettingsService: SettingsService,
    private toastr: ToastrService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

  ngDoCheck() {

    if (this.__modalUsuarioService.oculto == "" && this.n_vez == 0) {
      this.n_vez = 1;
    }

    if (this.__modalUsuarioService.opcion == "updatePassword" && this.n_vez2 == 0) {
      this.n_vez2 = 1;
      this.PASSWORD_DATA.estado = this.__modalUsuarioService.estado;
      this.PASSWORD_DATA.role = this.__modalUsuarioService.role;
    }
  }

  cerrarModal() {
    this.n_vez = 0;
    this.n_vez2 = 0;

    this.USUARIO_DATA =
    {
      "id": "",
      "email": "",
      "password": "",
      "rol": "COLABORADOR",
      "token": "",
    };

    this.__modalUsuarioService.ocultarModal();
  }

  changeOption() {
    if (this.optionCambioPass == 0) {
      this.optionCambioPass = 1;
    } else {
      this.optionCambioPass = 0;
      this.PASSWORD_DATA.new_password = "";
      this.PASSWORD_DATA.new_password2 = "";
    }
  }

  updatePassword() {

    if (this.optionCambioPass == 1) {
      if (this.PASSWORD_DATA.new_password == "" || this.PASSWORD_DATA.new_password2 == "") {
        this.toastr.error("Ingrese Contraseña.", 'Ocurrió un error!', { timeOut: 5000 });
        return;
      }

      if (this.PASSWORD_DATA.new_password != this.PASSWORD_DATA.new_password2) {
        this.toastr.error("Las contraseñas deben ser iguales para la validación.", 'Ocurrió un error!', { timeOut: 5000 });
        return;
      }
    }

    this.PASSWORD_DATA.token = this.__usuarioService.token;
    this.PASSWORD_DATA.idUsuario = this.__modalUsuarioService.idUsuario;

    document.getElementById("btn_updatePassword").style.display = "none";

    this.__usuarioService.usuarioUpdate(this.PASSWORD_DATA)
      .subscribe((resp2: any) => {
        console.log(resp2)
        if (resp2.ok) {
          this.toastr.success("", 'Usuario actualizado', { timeOut: 5000 });
          this.__usuarioService.__refreshUsuarios();
          this.cerrarModal();
          return;
        }
        document.getElementById("btn_updatePassword").style.display = "block";
      });
  }

  agregarUsuario() {

    if (this.USUARIO_DATA.email == "") {
      this.toastr.error("Ingrese e-mail del usuario.", 'Ocurrió un error!', { timeOut: 5000 });
      return;
    }

    if (this.USUARIO_DATA.password == "") {
      this.toastr.error("Ingrese contraseña del usuario.", 'Ocurrió un error!', { timeOut: 5000 });
      return;
    }

    document.getElementById("btn_add_user").style.display = "none";

    this.USUARIO_DATA.token = this.__usuarioService.token;

    this.__usuarioService.crearUsuario(this.USUARIO_DATA)
      .subscribe((resp2: any) => {
        if (resp2.ok) {
          this.toastr.success("", 'Usuario Creado', { timeOut: 5000 });
          this.__usuarioService.__refreshUsuarios();
          this.cerrarModal();
        } else {

          document.getElementById("btn_add_user").style.display = "block";
          this.toastr.error(resp2.msn, 'Ocurrió un error!', { timeOut: 5000 });
        }
      });
  }

}
