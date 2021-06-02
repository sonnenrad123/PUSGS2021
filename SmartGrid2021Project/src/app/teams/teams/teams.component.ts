import { Component, OnInit } from '@angular/core';
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
  
  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.RetrieveAllTeams();
  }
  
  RetrieveAllTeams() : any{
    this.teams = this.teamService.getAllTeams();
  
  }

  CreateNewTeam(){
    this.router.navigate(['/CreateNewTeam']);
  }
}
