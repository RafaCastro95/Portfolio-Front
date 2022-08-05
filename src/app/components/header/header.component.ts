import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public persona: persona = new persona ("","","","","","");
  public editPersona: persona | undefined;


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

  public onOpenModal(mode:String, persona: persona):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal'); 
    if (mode === 'edit'){
      this.editPersona=persona;
      button.setAttribute('data-target', '#editPersonaModal');
    }
    container?.appendChild(button); 
    button.click();
  }

  public onEditPersona(persona: persona){
    this.editPersona=persona;
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next:(response:persona) => {
        console.log(response);
        this.getPersona();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
