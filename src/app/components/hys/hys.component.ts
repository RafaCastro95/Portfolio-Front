import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/model/skills';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {

  roles!: string[];
  isAdmin = false;
  isLogged = false;
  public skills : Skill []=[];
  public editSkill: Skill | undefined;
  public deleteSkills: Skill | undefined;

  constructor(private skillService: SkillService,
     private tokenService: TokenService,
     private activatedRoute: ActivatedRoute
     ) { }

  ngOnInit(): void {
    this.getSkills();
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

  public getSkills():void{
    this.skillService.getSkills().subscribe({
      next:(Response: Skill[]) =>{
        this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })} 


    public onOpenModal(mode:String, skill?: Skill):void{
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display='none';
      button.setAttribute('data-toggle', 'modal'); 
      if(mode==='add'){
        button.setAttribute('data-target', '#addSkillModal');
      }else if (mode==='delete'){
        this.deleteSkills=skill;
        button.setAttribute('data-target', '#deleteSkillModal');
      }else if (mode === 'edit'){
        this.editSkill= skill;
        button.setAttribute('data-target', '#editSkillModal');
      }
      container?.appendChild(button); 
      button.click();
    }


    public onAddSkills(addForm: NgForm){
      document.getElementById('add-skill-form')?.click();
      this.skillService.nuevaSkill(addForm.value).subscribe({
        next:(response:Skill) => {
          console.log(response);
          this.getSkills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onEditSkills(skill:Skill) {
      this.editSkill= skill;
      this.skillService.editarSkill(skill).subscribe({
        next:(response: Skill) => {
          console.log(response);
          this.getSkills();
        }, 
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
 



    public onDeleteSkills(idSkill: number):void{
      this.skillService.borrarSkills(idSkill).subscribe({
        next:(response: void) => {
          console.log(response);
          this.getSkills();
        }, 
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
    
}