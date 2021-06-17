import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'node:process';
import { format } from 'ol/coordinate';
import { Observable } from 'rxjs';
import { WRStateChange } from 'src/app/models/common/wrstate-change';
import { WorkRequestDocumentState } from 'src/app/models/work-reques-doc-state/work-request-document-state.enum';
import { WorkRequestDocumentType } from 'src/app/models/work-reques-doc-typet/work-request-document-type.enum';
import { WorkRequest } from 'src/app/models/work-request/work-request';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestsService {
  
   

  constructor(private http:HttpClient) { }
  
  public get(id){
    return this.http.get<WorkRequest>(environment.apiUrl + 'WorkRequest/GetWorkRequest?id='+id);
  }

  public getAllWRs(){
    return this.http.get<Array<WorkRequest>>(environment.apiUrl+'WorkRequest/GetAllWorkRequests');
  }

  public CreateNewWR(){
      let bInfo = JSON.parse(window.sessionStorage.getItem('WRBICurrValue'));
      let stateChange : WRStateChange = {WRCurrentState :WorkRequestDocumentState.DRAFT, changedByUser: localStorage.getItem('user').toString(), changedOn: new Date() }
      let wr: WorkRequest = {equipment: JSON.parse(window.sessionStorage.getItem('WREquCurrValue')),
                             attachments: JSON.parse(window.sessionStorage.getItem('WRMAttCurrValue')),
                             stateChangesHistory: new Array<WRStateChange>(),
                             company: bInfo.company,
                             createdBy: bInfo.createdBy,
                             dateTimeCreated: bInfo.dateTimeCreated,
                             emergencyWork: bInfo.emergencyWork === "" ? false : true,
                             endDateTime: bInfo.endDateTime,
                             phoneNo: bInfo.phoneNo,
                             purpose: bInfo.purpose,
                             startDateTime: bInfo.startDateTime,
                             statusOfDocument: bInfo.statusOfDocument,
                             street: bInfo.street,
                             typeOfDocument: bInfo.typeOfDocument === "PLANNED_WORK" ? WorkRequestDocumentType.PLANNED_WORK: WorkRequestDocumentType.UNPLANNED_WORK,
                             details: bInfo.details,
                             incident: bInfo.incident,
                             notes: bInfo.notes
                            };
      wr.stateChangesHistory.push(stateChange);
      console.log(wr);
      window.sessionStorage.removeItem('WRBICurrValue');
      window.sessionStorage.removeItem('WRCHCurrValue');
      window.sessionStorage.removeItem('WRMAttCurrValue');
      window.sessionStorage.removeItem('WREquCurrValue');
      return this.http.post(environment.apiUrl + "WorkRequest/CreateNewWorkRequest", wr);
  }
}
