import { Component, OnInit } from '@angular/core';
import { ModalEmpleadoService } from 'src/app/componentes/modal-empleado/modal-empleado.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/service.index';
import { SettingsService } from 'src/app/services/settings.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
  ]
})
export class EmpleadosComponent implements OnInit {

  STATE_TO_DISPLAY = {
    all: 0,
  }

  loggedUser;

  emmpleados;
  empleadoToSearch = "";

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  // PARA PAGINACIÓN
  pagination = {
    "totalPaginas": 0,
    "totalData": 0,
    "actual": 1,
    "anterior": false,
    "siguiente": false
  }

  offset = 0;
  limit = 10;

  constructor(
    public _SettingsService: SettingsService,
    public _usuarioService: UsuarioService,
    public _EmpleadoService: EmpleadoService,
    public _ModalEmpleadoService: ModalEmpleadoService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

  ngOnInit(): void {
    this.searchEmpleado("");

    this._EmpleadoService.refresh.subscribe(isOpen => {
      this.searchEmpleado("");
    });
  }

  modalAddEmpleado() {
    this._ModalEmpleadoService.mostrarModal();
  }

  updateById(idEmpleado) {
    this._ModalEmpleadoService.mostrarModal(idEmpleado);
  }

  deleteById(idEmpleado) {

    let dataToSend = {
      idEmpleado: idEmpleado,
      token: this._usuarioService.token
    };

    swal.fire({
      title: 'Estás seguro?',
      text: 'Esta acción no se podrá revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.value) {


        this._EmpleadoService.deleteById(dataToSend)
          .subscribe((data: any) => {
            this.searchEmpleado('');
            console.log(data);
          });


        swal.fire(
          'Eliminado!',
          'Empleado eliminado.',
          'success'
        )
      }
    })

  }

  searchEmpleado(busqueda) {

    let dataEnviar = {
      "wordToFind": busqueda,
      "token": this._usuarioService.token
    }
    this.STATE_TO_DISPLAY.all = 0

    this._EmpleadoService.searchBy(dataEnviar)
      .subscribe((respuesta: any) => {
        console.log(respuesta)
        if (respuesta.ok) {

          this.emmpleados = respuesta.empleado;
          this.STATE_TO_DISPLAY.all = 1
          return;
        }

        this.emmpleados = [];
        this.STATE_TO_DISPLAY.all = 1
      });
  }
}
