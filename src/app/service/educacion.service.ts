import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  url:string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }


  public getEducacion(): Observable<Educacion[]>{
    return this.http.get<Educacion[]>(this.url + `educacion/todas`);
  }
  public addEducacion(educacion: Educacion): Observable<Educacion>{
    return this.http.post<Educacion>(this.url + `educacion/crear`,educacion);
  }
  public editarEducacion(educacion: Educacion): Observable<Educacion>{
    return this.http.put<Educacion>(this.url + `educacion/editar`,educacion);
  }
  public borrarEducacion(idEdu: number): Observable<void>{
    return this.http.delete<void>(this.url + `educacion/borrar/${idEdu}`);
  }

}
