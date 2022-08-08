import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { HeaderService } from 'src/app/service/header.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  public perfil: Perfil | undefined;
  public editPerfil: Perfil | undefined;

  constructor(private headerService : HeaderService) { }

  ngOnInit(): void {
    this.getPerfil();
  }

  public getPerfil():void{
    this.headerService.getPerfil().subscribe({
      next:(response: Perfil) =>{
        this.perfil=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, perfil: Perfil):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal'); 
    if (mode === 'edit'){
      this.editPerfil= perfil;
      button.setAttribute('data-target', '#editPerfilModal');
    }
    container?.appendChild(button); 
    button.click();
  }

  public onEditPerfil(perfil: Perfil){
    this.editPerfil=perfil;
    document.getElementById('edit-perfil-form')?.click();
    this.headerService.editarPerfil(perfil).subscribe({
      next:(response:Perfil) => {
        console.log(response);
        this.getPerfil();
      }, 
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }


}
