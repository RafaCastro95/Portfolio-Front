import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  roles!: string[];
  isAdmin = false;
  isLogged = false;
  public experiencias: Experiencia []=[];
  public editExperiencia: Experiencia | undefined;
  public deleteExperiencia: Experiencia | undefined;

  constructor(private experienciaService: ExperienciaService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getExperiencias();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    };

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
  }

  public getExperiencias():void{
    this.experienciaService.getExperiencias().subscribe({
      next:(Response: Experiencia[]) =>{
        this.experiencias=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, experiencia?: Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal'); 
    if(mode==='add'){
      button.setAttribute('data-target', '#addExperienciaModal');
    }else if (mode==='delete'){
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }else if (mode === 'edit'){
      this.editExperiencia=experiencia;
      button.setAttribute('data-target', '#editExperienciaModal');
    }
    container?.appendChild(button); 
    button.click();
  }

  public onAddExperiencia(addForm: NgForm){
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.nuevaExperiencia(addForm.value).subscribe({
      next:(response:Experiencia) => {
        console.log(response);
        this.getExperiencias();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditExperiencia(experiencia: Experiencia){
    this.editExperiencia= experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.editarExperiencia(experiencia).subscribe({
      next:(response:Experiencia) => {
        console.log(response);
        this.getExperiencias();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }


  public onDeleteExperiencia(idExp: number):void{
    this.experienciaService.borrarExperiencia(idExp).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getExperiencias();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }



}
