import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkRequestDocumentType } from 'src/app/models/work-reques-doc-typet/work-request-document-type.enum';
import { WorkRequest } from 'src/app/models/work-request/work-request';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestsService {
  
   

  constructor(private http:HttpClient) { }


  public CreateNewWR(){
      let bInfo = JSON.parse(window.sessionStorage.getItem('WRBICurrValue'));
      let wr: WorkRequest = {equipment: JSON.parse(window.sessionStorage.getItem('WREquCurrValue')),
                             attachments: JSON.parse(window.sessionStorage.getItem('WRMAttCurrValue')),
                             stateChangesHistory: JSON.parse(window.sessionStorage.getItem('WRCHCurrValue')),
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
      console.log(wr);
      window.sessionStorage.removeItem('WRBICurrValue');
      window.sessionStorage.removeItem('WRCHCurrValue');
      window.sessionStorage.removeItem('WRMAttCurrValue');
      window.sessionStorage.removeItem('WREquCurrValue');
      return this.http.post(environment.apiUrl + "WorkRequest/CreateNewWorkRequest", wr);
  }
}
