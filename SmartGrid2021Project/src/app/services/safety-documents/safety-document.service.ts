import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SafetyDocumentService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/SafetyDocuments';

  getSafetyDocuments():Observable<any>{
    return this.http.get(this.BaseURI);
  }

  getSafetyDocument(id):Observable<any>{
    return this.http.get(this.BaseURI + '/'+id);
  }

  addSafetyDocument(data){
    return this.http.post(this.BaseURI,data);
  }
  
  deleteSafetyDocument(id): Observable<any> {
    return this.http.delete(this.BaseURI + '/'+id);
  }

  update(id, data): Observable<any> {
    return this.http.put(this.BaseURI+'/'+id, data);
  }
}
