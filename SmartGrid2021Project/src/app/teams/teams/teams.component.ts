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
  
  RetrieveAllTeams(){
    this.teamService.getAllTeams().subscribe(_ => this.teams = JSON.parse(JSON.stringify(_)));
  }

  CreateNewTeam(){
    this.router.navigate(['/CreateNewTeam']);
  }
}
