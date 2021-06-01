import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncidentServiceService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/';

  getIncidents(){
    return this.http.get(this.BaseURI + 'incidents/GetIncidents');
  }

  getString(){
    return this.http.get(this.BaseURI + 'incidents/GetString');
  }

  addIncident(formData){
    return this.http.post(this.BaseURI + 'incidents/PostIncident',formData);
  }
}
