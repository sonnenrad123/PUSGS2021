import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/teams/team.service';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrls: ['./team-display.component.css']
})
export class TeamDisplayComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TeamDisplayComponent>,private teamService:TeamService) { }
  team: any;
  availableTeamMembers: Array<any>;
  newTeamFormControl: FormGroup;

  ngOnInit(): void {
    this.newTeamFormControl = new FormGroup({
      teamID : new FormControl('', Validators.required),
      teamName: new FormControl('', Validators.required),
      teamMembers : new FormControl([])
    });

    this.teamService.getTeam(window.sessionStorage.getItem('teamId')).subscribe(
      (data) => {
        this.team = data;
        this.newTeamFormControl.patchValue({
          teamID : data.teamID,
          teamName: data.teamName,
          teamMembers: data.teamMembers
        });
        //console.log(this.team.teamId);
      },
      (err) =>{
        console.log(err);
      }
    );

    this.teamService.GetAllTeamMembersForTeamUpdate(window.sessionStorage.getItem('teamId')).subscribe(
      (data) => {
        this.availableTeamMembers = data;
        //console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );


  }
  selectSome(o1:any, o2: any){
    console.log(this.availableTeamMembers);
    return (o1.userTeamId.toString() === window.sessionStorage.getItem('teamId'));
  }

  Close(){
    this.dialogRef.close();
  }

  Save(){
    this.dialogRef.close(this.newTeamFormControl.value);
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
}
