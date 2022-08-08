import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../model/perfil';



@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  url:string = "http://localhost:8080/api/"
  

  constructor(private http: HttpClient) { }


  public getPerfil(): Observable<Perfil>{
    return this.http.get<Perfil>(this.url + "perfil/1");
  }

  public editarPerfil(perfil: Perfil): Observable<Perfil>{
    return this.http.put<Perfil>(this.url + "perfil/editar", perfil);
  }
}
