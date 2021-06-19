import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }

  getIncidentsForMap():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'Map/GetActuallyIncidents');
  }
}
