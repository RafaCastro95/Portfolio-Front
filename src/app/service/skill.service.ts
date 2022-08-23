import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skills';



@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url:string = "https://backnd2022.herokuapp.com/api/"

  constructor(private http: HttpClient) { }



  public getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url + `skills/todas`);
  }
  public nuevaSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>(this.url + `skills/crear`,skill);
  }
  public detail(id:number): Observable<Skill>{
    return this.http.get<Skill>(this.url + `detalle/${id}`);
  }
  public editarSkill( skill: Skill): Observable<Skill>{
    return this.http.put<Skill>(this.url + `skills/editar`,skill);
  }
  public borrarSkills(idSkill: number): Observable<void>{
    return this.http.delete<void>(this.url + `skills/borrar/${idSkill}`)
  }

}
