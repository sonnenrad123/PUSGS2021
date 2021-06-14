import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkRequest } from 'src/app/models/work-request/work-request';
import { WorkRequestAttachments } from 'src/app/models/work-request/work-request-attachments';
import { WorkRequestBasicInfo } from 'src/app/models/work-request/work-request-basic-info';
import { WorkRequestEquipment } from 'src/app/models/work-request/work-request-equipment';
import { WorkRequestStateChangesHistory } from 'src/app/models/work-request/work-request-state-changes-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestsService {
  static wrBasicInfo: WorkRequestBasicInfo;
  static wrStateChanged: WorkRequestStateChangesHistory;
  static wrAttachments: WorkRequestAttachments;
  static wrEquipment: WorkRequestEquipment;
  workRequest: WorkRequest;    

  constructor(private http:HttpClient) { }


  public SaveWorkInfo(data){
    WorkRequestsService.wrBasicInfo = data;
  }

  public SaveStateChanging(data){
    WorkRequestsService.wrStateChanged = data;
  }

  public SaveWRAttachments(data){
    WorkRequestsService.wrAttachments = data;
  }

  public SaveWREquipment(data){
    WorkRequestsService.wrEquipment = data;
  }

  public CreateNewWR(){
      this.workRequest = new WorkRequest(WorkRequestsService.wrBasicInfo,
                                         WorkRequestsService.wrStateChanged,
                                         WorkRequestsService.wrAttachments,
                                         WorkRequestsService.wrEquipment);
                                         console.log(this.workRequest);
      WorkRequestsService.wrBasicInfo = undefined;
      WorkRequestsService.wrStateChanged = undefined;
      WorkRequestsService.wrAttachments = undefined;
      WorkRequestsService.wrEquipment = undefined;

      return this.http.post(environment.apiUrl + "WorkRequests/CreateNewWR", this.workRequest);
  }
}
