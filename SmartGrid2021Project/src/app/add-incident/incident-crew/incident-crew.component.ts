import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/teams/team.service';

@Component({
  selector: 'app-incident-crew',
  templateUrl: './incident-crew.component.html',
  styleUrls: ['./incident-crew.component.css']
})
export class IncidentCrewComponent implements OnInit {
  teams: any;
  unfilteredTeams:any[];
  selectedCrew:any;
  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.RetrieveAllTeams();
    this.selectedCrew = JSON.parse(window.sessionStorage.getItem('incidentCrewId'));
  }


  RetrieveAllTeams(){
    this.teamService.getAllTeams().subscribe(_ => this.teams = JSON.parse(JSON.stringify(_)));
    this.unfilteredTeams = this.teams;
  }

  getTeam(team:any){
    //console.log(team.target.parentNode.innerText);
    let strings = team.target.parentNode.innerText.split(['-']);
    let teamid = strings[0];
    console.log(teamid);
    this.selectedCrew = teamid;
    window.sessionStorage.setItem('incidentCrewId',JSON.stringify(teamid));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   
    this.teams = this.unfilteredTeams.filter((x) => x.teamName.includes(filterValue));
    if(filterValue.trim().toLowerCase() == ""){
      this.teams = this.unfilteredTeams;
    }
  }
}
