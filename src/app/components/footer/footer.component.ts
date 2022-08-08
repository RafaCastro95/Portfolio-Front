import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { HeaderService } from 'src/app/service/header.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public perfil: Perfil | undefined;
  public editperfil: Perfil | undefined;

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
}
