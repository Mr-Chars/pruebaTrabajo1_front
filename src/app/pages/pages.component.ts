import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  theme = {
    name:"light",
    background:"bg-light",
    background2:"bg-light",
    text:"text-dark",
    btnType1:"btn-primary",
  }
  
  constructor(
    public _SettingsService: SettingsService,
  ) { 
    this.theme=this._SettingsService.loadThemeFromStorage()
  }

  ngOnInit() {
    // init_plugins();

    this._SettingsService.refreshTheme.subscribe(isOpen => {
      this.theme=this._SettingsService.loadThemeFromStorage()
    });
  }

}
