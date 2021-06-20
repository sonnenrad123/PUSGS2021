import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isObservable, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SwitchingPlanService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/switchingplans';

  getSwitchingPlans():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getSwitchingPlan(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  modifySwitchingPlan(id,data){
    return this.http.put(this.BaseURI + '/'+id,data);
  }

  addSwitchingPlan(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteSwitchingPlan(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }
}