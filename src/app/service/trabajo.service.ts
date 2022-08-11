import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajo } from '../model/trabajos';
;

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {
  url:string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }


  public getTrabajos(): Observable<Trabajo[]>{
    return this.http.get<Trabajo[]>(this.url + `trabajo/todas`);
  }
  public nuevoTrabajo(trabajo: Trabajo): Observable<Trabajo>{
    return this.http.post<Trabajo>(this.url + `trabajo/crear`,trabajo);
  }
  public editarTrabajo(trabajo: Trabajo): Observable<Trabajo>{
    return this.http.put<Trabajo>(this.url + `trabajo/editar`,trabajo);
  }
  public borrarTrabajo(idPro: number): Observable<void>{
    return this.http.delete<void>(this.url + `trabajo/borrar/${idPro}`);
  }




}
