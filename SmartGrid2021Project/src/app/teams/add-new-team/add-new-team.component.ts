import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team/team';
import { User } from 'src/app/models/user/user';
import { TeamService } from 'src/app/services/teams/team.service';

@Component({
  selector: 'app-add-new-team',
  templateUrl: './add-new-team.component.html',
  styleUrls: ['./add-new-team.component.css']
})
export class AddNewTeamComponent implements OnInit {
  newTeamFormControl: FormGroup;
  public static teamID: number = 0;
  teamMemberss: Array<any>;
  constructor(private teamService: TeamService, private router: Router, private snackBar: MatSnackBar) { 
    this.newTeamFormControl = new FormGroup({
      teamID : new FormControl(''),
      teamName: new FormControl('', Validators.required),
      teamMembers : new FormControl([])
    });
  }

  ngOnInit(): void {
    this.teamService.getAllTeamMembers().subscribe(_ => this.teamMemberss = _);
  }
  getErrorMessageTeamName(){
    const field = this.newTeamFormControl.get('teamName');
    if(field !== null){
      if(field.hasError('required')){
        return 'The teamName field is required';
      }
    }
    return '';
  }
  CreateNewTeam(){
    AddNewTeamComponent.teamID++; 
    this.newTeamFormControl.controls['teamID'].setValue(AddNewTeamComponent.teamID);
    this.teamService.createNewTeam(this.newTeamFormControl.value).subscribe( _ => {
      console.log("Team added!");
      this.snackBar.open('Team '+this.newTeamFormControl.controls['teamName'].value+' created successfully!', 'OK');
      this.router.navigate(['/TeamsView']);
    },
    (error) => {
      console.log("err", error);
    });
  }
}
