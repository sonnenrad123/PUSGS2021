import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncidentServiceService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/incidents';

  getIncidents():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getIncident(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addIncident(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteIncident(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }
}
