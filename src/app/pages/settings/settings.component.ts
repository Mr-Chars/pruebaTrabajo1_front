import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  darkTheme = 0;

  constructor(
    public _SettingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.getTheme()
  }

  getTheme(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      if (this._SettingsService.loadThemeFromStorage().name == "light") {
        this.darkTheme = 0
      } else {
        this.darkTheme = 1
      }
      resolve(true);
    })
  }

  setTheme(theme) {

    this._SettingsService.setThemeStorage(theme)

    this._SettingsService.__refreshTheme();
    this.getTheme();
  }

}
