import { Injectable } from '@angular/core';
import { WorkRequestBasicInfo } from 'src/app/models/work-request/work-request-basic-info';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestsService {
  static wrBasicInfo: WorkRequestBasicInfo;
  constructor() { }


  public SaveWorkInfo(data){
    WorkRequestsService.wrBasicInfo = data;
  }
}
