import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Array<Team> = [
    {id: 1, teamName: 'Team 1', teamMembers: ['Member 1', 'Member 2']},
    {id: 2, teamName: 'Team 2', teamMembers: ['Member 3', 'Member 7']},
    {id: 3, teamName: 'Team 3', teamMembers: ['Member 4', 'Member 8', 'Member 11']},
    {id: 4, teamName: 'Team 4', teamMembers: ['Member 5', 'Member 9']},
    {id: 5, teamName: 'Team 5', teamMembers: ['Member 6', 'Member 10']},
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  CreateNewTeam(){
    this.router.navigate(['/CreateNewTeam']);
  }
}
