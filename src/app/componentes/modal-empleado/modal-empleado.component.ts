import { Component, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SettingsService, UsuarioService } from 'src/app/services/service.index';
import { CargandoService } from '../cargando/cargando.service';
import { ModalEmpleadoService } from './modal-empleado.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styles: [
  ]
})
export class ModalEmpleadoComponent implements DoCheck {

  n_vez = 0;

  AFP_TYPE = [
    'fondo protección de capital',
    'fondo de preservación de capital',
    'fondo mixto',
    'fondo de apreciación de capital',
  ]

  EMPLEADO_DATA_ERROR = {
    "nombres": "",
    "apellidos": "",
    "fecha_nacimiento": "",
    "fecha_ingreso": "",
    "afp": "",
    "cargo": "",
    "sueldo": "",
  };

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  EMPLEADO_DATA = {
    "nombres": "",
    "apellidos": "",
    "fecha_nacimiento": "",
    "fecha_ingreso": "",
    "afp": "fondo protección de capital",
    "cargo": "",
    "sueldo": "",
    "idEmpleado": 0,
    "token": "",
  }

  constructor(
    public __ModalEmpleadoService: ModalEmpleadoService,
    public __EmpleadoService: EmpleadoService,
    public __usuarioService: UsuarioService,
    public _Cargando: CargandoService,
    public _SettingsService: SettingsService,
    private toastr: ToastrService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

  ngDoCheck() {

    if (this.__ModalEmpleadoService.oculto == "" && this.__ModalEmpleadoService.idEmpleado == 0 && this.n_vez == 0) {
      // this.cargarDatos();
      this.n_vez = 1;
    }

    if (this.__ModalEmpleadoService.oculto == "" && this.__ModalEmpleadoService.idEmpleado > 0 && this.n_vez == 0) {
      this.cargarDatos();
      this.n_vez = 1;
    }

  }

  cargarDatos() {
    this._Cargando.mostrarAnimacion();
    this.getEmpleadoById().then(
      () => {
        this._Cargando.ocultarAnimacion();
      }
    ).catch(error => console.error("Error en la promesa", error));
  }

  update() {
    if (!this.validarCampo()) {
      return;
    }

    this.EMPLEADO_DATA.token = this.__usuarioService.token;
    this.EMPLEADO_DATA.idEmpleado = this.__ModalEmpleadoService.idEmpleado;

    this.__EmpleadoService.update(this.EMPLEADO_DATA)
      .subscribe((resp2: any) => {

        if (resp2.ok) {
          this.toastr.success("", 'Empleado actualizado', { timeOut: 4500 });
          this.__EmpleadoService.__refresh();
          this.closeModal();
        } else {
          this.toastr.error(resp2.msn, 'Ocurrió un error!', { timeOut: 4500 });
        }

      });
  }

  add() {
    if (!this.validarCampo()) {
      return;
    }

    this.EMPLEADO_DATA.token = this.__usuarioService.token;

    this.__EmpleadoService.add(this.EMPLEADO_DATA)
      .subscribe((resp2: any) => {

        if (resp2.ok) {
          this.toastr.success("", 'Empleado agregado', { timeOut: 4500 });
          this.__EmpleadoService.__refresh();
          this.closeModal();
        } else {
          this.toastr.error(resp2.msn, 'Ocurrió un error!', { timeOut: 4500 });
        }

      });
  }

  getEmpleadoById(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let dataEnviar = {
        "token": this.__usuarioService.token,
        "idEmpleado": this.__ModalEmpleadoService.idEmpleado,
      }

      this.__EmpleadoService.getById(dataEnviar)
        .subscribe((respuesta: any) => {

          if (respuesta.ok) {
            let fecha_nacimiento = new Date(respuesta.empleado[0].fecha_nacimiento);
            let fecha_ingreso = new Date(respuesta.empleado[0].fecha_ingreso);
            let fecha_nacimiento_format = (fecha_nacimiento.getFullYear()) + '-' + (fecha_nacimiento.getMonth() + 1).toString().padStart(2, "0") + '-' + fecha_nacimiento.getDate().toString().padStart(2, "0");
            let fecha_ingreso_format = (fecha_ingreso.getFullYear()) + '-' + (fecha_ingreso.getMonth() + 1).toString().padStart(2, "0") + '-' + fecha_ingreso.getDate().toString().padStart(2, "0");

            this.EMPLEADO_DATA.nombres = (respuesta.empleado.length > 0) ? respuesta.empleado[0].nombres : '';
            this.EMPLEADO_DATA.apellidos = (respuesta.empleado.length > 0) ? respuesta.empleado[0].apellidos : '';
            this.EMPLEADO_DATA.fecha_nacimiento = (respuesta.empleado.length > 0) ? fecha_nacimiento_format : '';
            this.EMPLEADO_DATA.fecha_ingreso = (respuesta.empleado.length > 0) ? fecha_ingreso_format : '';
            this.EMPLEADO_DATA.afp = (respuesta.empleado.length > 0) ? respuesta.empleado[0].afp : '';
            this.EMPLEADO_DATA.cargo = (respuesta.empleado.length > 0) ? respuesta.empleado[0].cargo : '';
            this.EMPLEADO_DATA.sueldo = (respuesta.empleado.length > 0) ? respuesta.empleado[0].sueldo : '';
            resolve(true);
            return;
          }
          // this.OPTIONS_FormatoHabilidad = [];
          resolve(true);
        });
    })
  }

  closeModal() {
    this.n_vez = 0;
    this.EMPLEADO_DATA_ERROR = {
      "nombres": "",
      "apellidos": "",
      "fecha_nacimiento": "",
      "fecha_ingreso": "",
      "afp": "",
      "cargo": "",
      "sueldo": "",
    };

    this.EMPLEADO_DATA = {
      "nombres": "",
      "apellidos": "",
      "fecha_nacimiento": "",
      "fecha_ingreso": "",
      "afp": "fondo protección de capital",
      "cargo": "",
      "sueldo": "",
      "idEmpleado": 0,
      "token": "",
    };

    this.__ModalEmpleadoService.ocultarModal();
  }

  validarCampo() {
    this.limpiar();
    if (this.EMPLEADO_DATA.nombres == "") {
      this.EMPLEADO_DATA_ERROR.nombres = "Este campo no puede estar vacio";
      return false;
    }
    if ((this.EMPLEADO_DATA.nombres).length > 80) {
      this.EMPLEADO_DATA_ERROR.nombres = "Este campo no puede tener mas de 80 caracteres";
      return false;
    }

    if (this.EMPLEADO_DATA.apellidos == "") {
      this.EMPLEADO_DATA_ERROR.apellidos = "Este campo no puede estar vacio";
      return false;
    }
    if ((this.EMPLEADO_DATA.apellidos).length > 80) {
      this.EMPLEADO_DATA_ERROR.apellidos = "Este campo no puede tener mas de 100 caracteres";
      return false;
    }

    if (this.EMPLEADO_DATA.fecha_nacimiento == "") {
      this.EMPLEADO_DATA_ERROR.fecha_nacimiento = "Este campo no puede estar vacio";
      return false;
    }

    if (this.EMPLEADO_DATA.fecha_ingreso == "") {
      this.EMPLEADO_DATA_ERROR.fecha_ingreso = "Este campo no puede estar vacio";
      return false;
    }

    if (this.EMPLEADO_DATA.cargo == "") {
      this.EMPLEADO_DATA_ERROR.cargo = "Este campo no puede estar vacio";
      return false;
    }
    if ((this.EMPLEADO_DATA.cargo).length > 80) {
      this.EMPLEADO_DATA_ERROR.cargo = "Este campo no puede tener mas de 100 caracteres";
      return false;
    }

    if (!this.EMPLEADO_DATA.sueldo) {
      this.EMPLEADO_DATA_ERROR.sueldo = "Este campo no puede estar vacio";
      return false;
    }

    this.limpiar();
    return true;
  }

  limpiar() {
    this.EMPLEADO_DATA_ERROR = {
      "nombres": "",
      "apellidos": "",
      "fecha_nacimiento": "",
      "fecha_ingreso": "",
      "afp": "",
      "cargo": "",
      "sueldo": "",
    };
  }

}
