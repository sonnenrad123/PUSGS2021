import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/notifications';

  getNotifications():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getNotification(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addNotification(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteNotification(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }
}