import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public persona: persona = new persona ("","","","","","");
  public editPersona: persona | undefined

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona();
  }

  public getPersona():void{
    this.personaService.getPersona().subscribe({
      next:(response: persona) =>{
        this.persona=response
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }
}
