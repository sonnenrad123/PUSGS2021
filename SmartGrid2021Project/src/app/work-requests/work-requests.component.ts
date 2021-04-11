import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../common/mat-table/table-column';
import { WorkRequest } from '../models/work-request/work-request';
import { WrDocumentStatus } from '../models/wr-document-status/wr-document-status.enum';

@Component({
  selector: 'app-work-requests',
  templateUrl: './work-requests.component.html',
  styleUrls: ['./work-requests.component.css']
})
export class WorkRequestsComponent implements OnInit {
  toggleAll: boolean;
  toggleMy: boolean;
  toggleOptions: Array<string> = ["All", "My"];
  WRTableColumns: TableColumn[];
  
  workRequests: WorkRequest[];


  constructor() { 
  }
  

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMy = false;
    this.initializeColumns();
    this.workRequests = this.getWorkRequests();

   
  }

  showAllWorkRequests(){
    
  }
  showMyWorkRequests(){
    
  }
  
  getWorkRequests(): any[]{
    return [
      {id:'WR 1', start_date:new Date().toDateString(), phone_no:'351-661-3252', status: WrDocumentStatus.DRAFT, address:'Some address 1'},
      {id:'WR 2', start_date:new Date().toDateString(), phone_no:'251-661-5362', status: WrDocumentStatus.DRAFT, address:'Some address 2'},
      {id:'WR 3', start_date:new Date().toDateString(), phone_no:'351-661-3252', status: WrDocumentStatus.DRAFT, address:'Some address 3'},
      {id:'WR 4', start_date:new Date().toDateString(), phone_no:'251-661-5362', status: WrDocumentStatus.DRAFT, address:'Some address 4'},
      {id:'WR 5', start_date:new Date().toDateString(), phone_no:'352-758-3154', status: WrDocumentStatus.DRAFT, address:'Some address 5'},
      {id:'WR 6', start_date:new Date().toDateString(), phone_no:'351-661-1234', status: WrDocumentStatus.DRAFT, address:'Some address 6'},
    ];
  }
  initializeColumns(): void{
    this.WRTableColumns = [
    {
      name: 'ID',
      dataKey: 'id',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'START DATE',
      dataKey: 'start_date',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'PHONE NO.',
      dataKey: 'phone_no',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'STATUS',
      dataKey: 'status',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'ADDRESS',
      dataKey: 'address',
      isSortable: true,
      position: 'left'
    },
  ];
  }
  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      return this.workRequests = this.workRequests.sort((a: WorkRequest, b: WorkRequest) => a[keyName].localeCompare(b[keyName]));
    } 
    else if (sortParameters.direction === 'desc') {
      return this.workRequests = this.workRequests.sort((a: WorkRequest, b: WorkRequest) => b[keyName].localeCompare(a[keyName]));
    } else 
    {
      return this.workRequests = this.getWorkRequests();
    }
  }

  removeOrder(workRequest: WorkRequest) {
    this.workRequests = this.workRequests.filter(item => item.id !== workRequest.id)
  }
}
