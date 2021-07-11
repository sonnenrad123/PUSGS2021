import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamService } from '../services/teams/team.service';

@Component({
  selector: 'app-select-team-dialog',
  templateUrl: './select-team-dialog.component.html',
  styleUrls: ['./select-team-dialog.component.css']
})
export class SelectTeamDialogComponent implements OnInit {

  teams: any;
  unfilteredTeams:any[];
  selectedCrew:any;
  constructor(private router: Router, private teamService: TeamService,private dialogRef: MatDialogRef<SelectTeamDialogComponent>) { }

  ngOnInit(): void {
    this.RetrieveAllTeams();
    this.selectedCrew = JSON.parse(window.sessionStorage.getItem('switchingPlanTeam'));
  }


  RetrieveAllTeams(){
    this.teamService.getAllTeams().subscribe(_ => this.teams = JSON.parse(JSON.stringify(_)));
    this.unfilteredTeams = this.teams;
  }

  getTeam(team:any){
    //console.log(team.target.parentNode.innerText);
    let strings = team.target.parentNode.innerText.split([':']);
    let teamid = strings[1];
    console.log(teamid);
    this.selectedCrew = teamid;
    window.sessionStorage.setItem('switchingPlanTeam',JSON.stringify(teamid));
    this.dialogRef.close(this.selectedCrew);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   
    this.teams = this.unfilteredTeams.filter((x) => x.teamName.includes(filterValue));
    if(filterValue.trim().toLowerCase() == ""){
      this.teams = this.unfilteredTeams;
    }
  }

}
