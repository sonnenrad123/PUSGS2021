import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StreetPriorityService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/streetpriorities';

  getStreetPriorities():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getStreetPriority(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addStreetPriority(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteStreetPriority(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }

  update(id, data): Observable<any> {
    return this.http.put(this.BaseURI+'/'+id, data);
  }

  addDummyPriorities(){
    return this.http.get(this.BaseURI+'/AddDummyPriorities');
  }
}
