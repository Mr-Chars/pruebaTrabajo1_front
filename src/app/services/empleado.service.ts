import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    public http: HttpClient,
  ) { }

  @Output() refresh: EventEmitter<boolean> = new EventEmitter();
  __refresh() {
    this.refresh.emit();
  }

  add(dataToSend) {
    // let url = URL_SERVICIOS+"usuarios/agregarUsuario";
    let url = URL_SERVICIOS + "empleado_add";

    return this.http.post(url, dataToSend)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        return of(err);
      });
  }

  update(dataToSend) {
    // let url = URL_SERVICIOS+"usuarios/agregarUsuario";
    let url = URL_SERVICIOS + "empleado_update";

    return this.http.post(url, dataToSend)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        return of(err);
      });
  }

  deleteById(dataToSend) {
    // let url = URL_SERVICIOS+"usuarios/agregarUsuario";
    let url = URL_SERVICIOS + "empleado_deleteById";

    return this.http.post(url, dataToSend)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        return of(err);
      });
  }

  searchBy(data) {
    // let url=URL_SERVICIOS+ "usuarios/obtenerUsuariolive?offset="+data.offset+"&limit="+data.limit+"&busqueda="+data.busqueda+"&token="+data.token;
    let url = URL_SERVICIOS + "empleado_searchBy?wordToFind=" + data.wordToFind + "&token=" + data.token;

    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        return of(err);
      });
  }

  getById(data) {
    // let url=URL_SERVICIOS+ "usuarios/obtenerUsuariolive?offset="+data.offset+"&limit="+data.limit+"&busqueda="+data.busqueda+"&token="+data.token;
    let url = URL_SERVICIOS + "empleado_getById?idEmpleado=" + data.idEmpleado + "&token=" + data.token;

    return this.http.get(url)
      .map((resp: any) => {
        return resp;
      })
      .catch(err => {
        return of(err);
      });
  }
}
