
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/model/perfil';
import { HeaderService } from 'src/app/service/header.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles!: string[];
  isAdmin = false;
  isLogged = false;
  nombreUsuario = '';
  public perfil: Perfil | undefined;
  public editPerfil: Perfil | undefined;

 

  constructor(private headerService : HeaderService,  private ruta:Router, private tokenService: TokenService) { }

  ngOnInit(): void {
   this.getPerfil();
   if(this.tokenService.getToken()){
    this.isLogged=true;
    this.nombreUsuario= this.tokenService.getUserName();
  }else{
    this.isLogged = false;
    this.nombreUsuario= '';
  };

  this.roles = this.tokenService.getAuthorities();
  this.roles.forEach(rol => {
    if(rol === 'ROLE_ADMIN'){
      this.isAdmin = true;
    }
  });
  

  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
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
