import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/Calls';
  getCalls():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getCall(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addCall(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteCall(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }

  getCallsWithProvidedDevices(data):Observable<any>{
    return this.http.get(this.BaseURI + '/GetCallsForAddresses/'+data);
  }
}
