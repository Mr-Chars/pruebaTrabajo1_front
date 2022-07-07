import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeSidebar1 = 0

  ROL: any
  email: any

  theme = {
    name: "light",
    background: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  logoUrl = 'assets/img/logo.png';
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _SettingsService: SettingsService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

  ngOnInit() {
    // this._usuarioService.obtenerDataToken(this._usuarioService.token).subscribe((data) => {
    //  DJANGOOO
    //   this.ROL = data.usuario.rol
    //   // this.email=data.usuario.email.replace('@apolomultimedia.com', '');

    // });
    this._usuarioService.obtenerDataToken(this._usuarioService.token).subscribe((resp) => {
      //  PHP
      console.log(resp)
      this.ROL = resp.tokenData.rol
      this.email = resp.tokenData.email.replace('@gmail.com', '');

    });

    this._SettingsService.refreshTheme.subscribe(isOpen => {
      this.theme = this._SettingsService.loadThemeFromStorage()
    });
  }

  toggleActiveSidebar() {
    if (this.activeSidebar1 == 1) {
      document.getElementsByClassName("wrapper")[0].classList.remove("nav-collapsed");
      document.getElementsByClassName("wrapper")[0].classList.remove("menu-collapsed");
      this.activeSidebar1 = 0
      return
    }
    if (this.activeSidebar1 == 0) {
      document.getElementsByClassName("wrapper")[0].classList.add("nav-collapsed");
      document.getElementsByClassName("wrapper")[0].classList.add("menu-collapsed");
      this.activeSidebar1 = 1
      return
    }
  }

}
