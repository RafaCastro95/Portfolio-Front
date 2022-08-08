import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trabajos } from 'src/app/model/trabajos';
import { TrabajosService } from 'src/app/service/trabajos.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  public trabajos: Trabajos []=[];
  public editTrabajos: Trabajos | undefined;
  public deleteTrabajos: Trabajos | undefined;

  constructor(private trabajosService: TrabajosService) { }

  ngOnInit(): void {
    this.getTrabajos();
  }

  public getTrabajos():void{
    this.trabajosService.getTrabajos().subscribe({
      next:(Response: Trabajos[]) =>{
        this.trabajos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }


  public onOpenModal(mode:String, trabajos?: Trabajos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal'); 
    if(mode==='add'){
      button.setAttribute('data-target', '#addTrabajosModal');
    }else if (mode==='delete'){
      this.deleteTrabajos= trabajos;
      button.setAttribute('data-target', '#deleteTrabajosModal');
    }else if (mode === 'edit'){
      this.editTrabajos= trabajos;
      button.setAttribute('data-target', '#editTrabajosModal');
    }
    container?.appendChild(button); 
    button.click();
  }

  public onAddTrabajos(addForm: NgForm){
    document.getElementById('add-trabajos-form')?.click();
    this.trabajosService.nuevoTrabajo(addForm.value).subscribe({
      next:(response:Trabajos) => {
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

  public onEditTrabajos(trabajos: Trabajos){
    this.editTrabajos= trabajos;
    document.getElementById('add-trabajos-form')?.click();
    this.trabajosService.editarTrabajo(trabajos).subscribe({
      next:(response:Trabajos) => {
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
