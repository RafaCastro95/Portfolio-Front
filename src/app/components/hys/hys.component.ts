import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public skills : Skills []=[];
  public editSkills: Skills | undefined;
  public deleteSkills: Skills | undefined;

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[]) =>{
        this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })} 


    public onOpenModal(mode:String, skills?: Skills):void{
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display='none';
      button.setAttribute('data-toggle', 'modal'); 
      if(mode==='add'){
        button.setAttribute('data-target', '#addSkillsModal');
      }else if (mode==='delete'){
        this.deleteSkills=skills;
        button.setAttribute('data-target', '#deleteSkillsModal');
      }else if (mode === 'edit'){
        this.editSkills=skills;
        button.setAttribute('data-target', '#editSkillsModal');
      }
      container?.appendChild(button); 
      button.click();
    }

    public onAddSkills(addForm: NgForm){
      document.getElementById('add-skills-form')?.click();
      this.skillsService.nuevaSkills(addForm.value).subscribe({
        next:(response:Skills) => {
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
    public onEditSkills(skills:Skills){
      this.editSkills= skills;
      document.getElementById('add-experiencia-form')?.click();
      this.skillsService.editarSkills(skills).subscribe({
        next:(response: Skills) => {
          console.log(response);
          this.getSkills();
        }, 
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }


    public onDeleteSkills(idSkills: number):void{
      this.skillsService.borrarSkills(idSkills).subscribe({
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







 

