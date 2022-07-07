import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent {

  theme = {
    name: "light",
    background: "bg-light",
    background2: "bg-light",
    text: "text-dark",
    btnType1: "btn-primary",
  }

  constructor(
    public _SettingsService: SettingsService,
  ) {
    this.theme = this._SettingsService.loadThemeFromStorage()
  }

}
