import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import  { first, map, catchError } from 'rxjs/operators';
import { Team } from 'src/app/models/team/team';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  getAllTeams(){
    return this.httpClient.get<Team[]>(environment.apiUrl + 'Team');
  }
  getAllTeamMembers(){
    return this.httpClient.get<User[]>(environment.apiUrl + 'Team/GetAllTeamMembers');
  }
  
  createNewTeam(formData){
    return this.httpClient.post(environment.apiUrl + 'Team/CreateNewTeam', formData);
  }
}
