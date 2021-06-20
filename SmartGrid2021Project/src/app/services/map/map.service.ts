import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwitchingPlanService } from '../switching-plan/switching-plan.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient, private sww: SwitchingPlanService) { }

  getIncidentsForMap():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'Map/GetActuallyIncidents');
  }

  getSwPlansForMap():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'Map/GetActuallySwitchingPlans');
  }
}
