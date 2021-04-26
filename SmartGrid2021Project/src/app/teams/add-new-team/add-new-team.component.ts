import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-add-new-team',
  templateUrl: './add-new-team.component.html',
  styleUrls: ['./add-new-team.component.css']
})
export class AddNewTeamComponent implements OnInit {
  newTeamFormControl: FormGroup;
  static teamID: number = 0;
  constructor() { 
    this.newTeamFormControl = new FormGroup({
      teamName: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }
  
  CreateNewTeam(){
    //team: {id: AddNewTeamComponent.teamID++, teamName: this.newTeamFormControl.controls["teamName"].value, } 
    
    
  }
}
