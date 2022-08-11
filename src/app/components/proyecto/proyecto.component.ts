import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trabajo } from 'src/app/model/trabajos';
import { TokenService } from 'src/app/service/token.service';

import { TrabajosService } from 'src/app/service/trabajos.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  roles!: string[];
  isAdmin = false;
  isLogged = false;
  public trabajos: Trabajo []=[];
  public editTrabajos: Trabajo | undefined;
  public deleteTrabajos: Trabajo | undefined;

  constructor(private trabajosService: TrabajosService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getTrabajos();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
  }

  public getTrabajos():void{
    this.trabajosService.getTrabajos().subscribe({
      next:(Response: Trabajo[]) =>{
        this.trabajos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
  }


  public onOpenModal(mode:String, trabajo?: Trabajo):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal'); 
    if(mode==='add'){
      button.setAttribute('data-target', '#addTrabajoModal');
    }else if (mode==='delete'){
      this.deleteTrabajos= trabajo;
      button.setAttribute('data-target', '#deleteTrabajoModal');
    }else if (mode === 'edit'){
      this.editTrabajos= trabajo;
      button.setAttribute('data-target', '#editTrabajoModal');
    }
    container?.appendChild(button); 
    button.click();
  }

  public onAddTrabajos(addForm: NgForm){
    document.getElementById('add-trabajo-form')?.click();
    this.trabajosService.nuevoTrabajo(addForm.value).subscribe({
      next:(response:Trabajo) => {
        console.log(response);
        this.getTrabajos();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditTrabajos(trabajo: Trabajo){
    this.editTrabajos= trabajo;
    document.getElementById('add-trabajo-form')?.click();
    this.trabajosService.editarTrabajo(trabajo).subscribe({
      next:(response:Trabajo) => {
        console.log(response);
        this.getTrabajos();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteTrabajos(idPro: number):void{
    this.trabajosService.borrarTrabajo(idPro).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getTrabajos();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
