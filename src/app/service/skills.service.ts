import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../model/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  url:string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }



  public getSkills(): Observable<Skills[]>{
    return this.http.get<Skills[]>(this.url + "skills/todas");
  }
  public nuevaSkills(skills: Skills): Observable<Skills>{
    return this.http.post<Skills>(this.url + "skills/crear",skills);
  }
  public editarSkills(skills: Skills): Observable<Skills>{
    return this.http.put<Skills>(this.url + "skills/editar",skills);
  }
  public borrarSkills(idSkills: number): Observable<void>{
    return this.http.delete<void>(this.url + "skills/borrar/${idSkills}")
  }

}
