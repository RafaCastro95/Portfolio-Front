import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajos } from '../model/trabajos';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  url:string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }


  public getTrabajos(): Observable<Trabajos[]>{
    return this.http.get<Trabajos[]>(this.url + "trabajos/todas");
  }
  public nuevoTrabajo(trabajos: Trabajos): Observable<Trabajos>{
    return this.http.post<Trabajos>(this.url + "trabajos/crear",trabajos);
  }
  public editarTrabajo(trabajos: Trabajos): Observable<Trabajos>{
    return this.http.put<Trabajos>(this.url + "trabajos/editar",trabajos);
  }
  public borrarTrabajo(idPro: number): Observable<void>{
    return this.http.delete<void>(this.url + "trabajos/borrar/${idPro}");
  }




}
