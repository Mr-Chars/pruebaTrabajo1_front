import { Component, OnInit } from '@angular/core';
import { SettingsService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Nombre = "Aaron";
  display1 = ""

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  constructor(
    public _usuarioService: UsuarioService,
    public _SettingsService: SettingsService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }



  ngOnInit() {
    this._SettingsService.refreshTheme.subscribe(isOpen => {
      this.theme = this._SettingsService.loadThemeFromStorage()
    });

    var openButton = document.getElementById('header_btn_1');
    var openIcon = document.getElementById('header_icon_1');
    document.onclick = (e: any) => {
      if (e.target === openButton) {
        return;
      }

      if (e.target === openIcon) {
        return;
      }
      this.display1 = ""
    };
  }

  whenOutOfElement1() {

  }

  toggle1() {
    if (this.display1 == "") {
      this.display1 = "show"
      return
    }
    if (this.display1 == "show") {
      this.display1 = ""
      return
    }
  }

}
