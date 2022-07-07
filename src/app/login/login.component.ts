import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  email = '';

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    init_plugins();
  }


  ingresar(forma: NgForm) {

    let usuario = { _id: "", email: forma.value.email, password: forma.value.password };

    this._usuarioService.buscarUsuario(usuario).subscribe((response) => {

      if (!response.ok) {
        this.toastr.error(response.mensaje, 'Ocurrió un error!', { timeOut: 5000 });
        return;
      }

      usuario._id = response.data.id;

      this._usuarioService.login(usuario, false)
        .subscribe((response2) => {

          if (!response2.ok) {
            this.toastr.error(response2.mensaje, 'Ocurrió un error!', { timeOut: 5000 });
            return;
          }
          this.toastr.success("Bienvenido!", 'Éxito!', { timeOut: 5000 });
          this.router.navigate(["/empleados"])
        });
    });


    // this.router.navigate(['/dashboard']);
  }


}