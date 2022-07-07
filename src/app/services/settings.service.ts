import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  constructor() { }

  @Output() refreshTheme: EventEmitter<boolean> = new EventEmitter();
  __refreshTheme() {
    this.refreshTheme.emit();
  }

  loadThemeFromStorage() {
    if (localStorage.getItem("theme")) {
      this.theme.name = localStorage.getItem("theme");
      if (this.theme.name == "light") {

        this.theme.background = "bg-light"
        this.theme.background2 = "bg-light"
        this.theme.text = "text-dark"
        this.theme.btnType1 = "btn-primary"
      } else if (this.theme.name == "dark") {

        this.theme.background = "bg-dark2"
        this.theme.background2 = "bg-dark"
        this.theme.text = "text-white"
        this.theme.btnType1 = "text-white border-white"
      }


    } else {
      this.theme.name = "light"
    }

    return this.theme;
  }

  setThemeStorage(theme) {

    localStorage.setItem("theme", theme);
  }
}
