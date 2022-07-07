import { Component, OnInit } from '@angular/core';
import { CargandoService } from 'src/app/componentes/cargando/cargando.service';
import { ModalUsuarioService } from 'src/app/componentes/modal-usuario/modal-usuario.service';
import { SettingsService, UsuarioService } from 'src/app/services/service.index';

import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  STATE_TO_DISPLAY = {
    all: 0,
  }

  loggedUser;

  usuarios;
  usuarioBuscar = "";

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
    public _usuarioService: UsuarioService,
    public __modalUsuarioService: ModalUsuarioService,
    public _Cargando: CargandoService,
    public _SettingsService: SettingsService,
    private toastr: ToastrService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

  ngOnInit(): void {
    this.buscarUsuario("");

    this._usuarioService.refreshUsuarios.subscribe(isOpen => {
      this.buscarUsuario("");
    });
  }

  cambiar_Pagina(page) {
    // Actualiza la página actual
    this.pagination.actual = page;
    this.offset = (page - 1) * this.limit;
    // Envia la petición para visualizar la data de esta página
    this.buscarUsuario(this.usuarioBuscar);
  }

  updatePassword(usuario) {
    this.__modalUsuarioService.mostrarModal("updatePassword", usuario.u_id, usuario.rol, usuario.estado);
  }

  modalAgregarUsuario() {
    this.__modalUsuarioService.mostrarModal();
  }

  eliminarUsuario(usuario_id) {

    let data_enviar = {
      usuario_id: usuario_id,
      token: this._usuarioService.token
    };

    swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.eliminarUsuario(data_enviar)
          .subscribe((data: any) => {
            this.buscarUsuario("");
            console.log(data);

          });
        this.toastr.success("", 'Usuario eliminado.', { timeOut: 5000 });
      }
    })

  }

  buscarUsuario(busqueda, desdeInicio = 0) {
    if (desdeInicio == 1) {
      this.offset = 0;
      this.limit = 10;
      this.pagination = {
        "totalPaginas": 0,
        "totalData": 0,
        "actual": 1,
        "anterior": false,
        "siguiente": false
      }
    }

    let dataEnviar = {
      "offset": this.offset,
      "limit": this.limit,
      "busqueda": busqueda,
      "token": this._usuarioService.token
    }
    this.STATE_TO_DISPLAY.all = 0
    this._usuarioService.buscarUsuarioLive(dataEnviar)
      .subscribe((respuesta: any) => {
        console.log(respuesta)
        if (respuesta.ok) {

          this.usuarios = respuesta.data;

          this.calcularPaginacion(respuesta)
          this.STATE_TO_DISPLAY.all = 1
          return;
        }

        this.usuarios = [];
        this.STATE_TO_DISPLAY.all = 1
      });
  }

  calcularPaginacion(respuesta) {
    this.pagination.totalData = respuesta.cantidadTotal;
    this.pagination.totalPaginas = Math.ceil(respuesta.cantidadTotal / this.limit);

    // console.log(respuesta)
    if (this.pagination.totalPaginas > this.pagination.actual) {
      this.pagination.siguiente = true;
    } else {
      this.pagination.siguiente = false;
    }

    if (this.pagination.actual > 1) {
      this.pagination.anterior = true;
    } else {
      this.pagination.anterior = false;
    }

  }
}
