import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/teams/team.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { TeamDisplayComponent } from '../team-display/team-display/team-display.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any;
  role: string;
  constructor(private router: Router, private teamService: TeamService, private snackBar: MatSnackBar, private dialog: MatDialog, private security: UserAccountService) { }

  ngOnInit(): void {
    this.RetrieveAllTeams();
    this.role = this.security.getRole();
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '800px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(TeamDisplayComponent, dialogConfig);
    window.sessionStorage.setItem('teamId', id);
    dialogRef.afterClosed().subscribe(
      data => {
        //console.log("Dialog output:", data);
        if(data !== undefined){
          this.teamService.UpdateTeam(data).subscribe(
            (data) => {
              //console.log(data);
              this.teamService.getAllTeams().subscribe(_ => this.teams = JSON.parse(JSON.stringify(_)));
              this.snackBar.open('Team '+id+' updated!', 'OK');
            }, 
            (err)  =>{
              console.log(err);
            }
          );
        }
        
      }
      
    );
    localStorage.removeItem('teamId');
  }
}
