import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/teams/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any;
  
  constructor(private router: Router, private teamService: TeamService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RetrieveAllTeams();
    
  }
  
  RetrieveAllTeams(){
    this.teamService.getAllTeams().subscribe(_ => this.teams = _);
  }

  CreateNewTeam(){
    this.router.navigate(['/CreateNewTeam']);
  }

  DeleteTeam(id){
    console.log(id);
    this.teamService.deleteTeam(id).subscribe(
      (data) => {
        console.log('Team deleted!');
        this.snackBar.open('Team '+id+' deleted!', 'OK');
        this.teamService.getAllTeams().subscribe(_ => this.teams = JSON.parse(JSON.stringify(_)));
      },
      (err) =>{
        console.log(err);
      }
    );
  }
  EditTeam(id){
    console.log(id);
  }
}
