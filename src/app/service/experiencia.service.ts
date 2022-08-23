import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  url:string = "https://backnd2022.herokuapp.com/api/"

  constructor(private http: HttpClient) { }


  public getExperiencias(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.url + `experiencia/todas`);
  }
  public nuevaExperiencia(experiencia: Experiencia): Observable<Experiencia>{
    return this.http.post<Experiencia>(this.url + `experiencia/crear`,experiencia);
  }
  public editarExperiencia(experiencia: Experiencia): Observable<Experiencia>{
    return this.http.put<Experiencia>(this.url + `experiencia/editar`,experiencia);
  }
  public borrarExperiencia(idExp: number): Observable<void>{
    return this.http.delete<void>(this.url + `experiencia/borrar/${idExp}`);
  }
  
}