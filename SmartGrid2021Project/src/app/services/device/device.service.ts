import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/devices';

  getDevices():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getDevice(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addDevice(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteDevice(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }

  getMaxDeviceID():Observable<any>{
    return this.http.get(this.BaseURI + '/GetMax');
  }
}
