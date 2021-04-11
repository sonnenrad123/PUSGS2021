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
      {id:'WR 1', start_date:new Date(), phone_no:'351-661-3252', status: WrDocumentStatus.DRAFT, address:'Some address 1'},
      {id:'WR 2', start_date:new Date("2020-04-16"), phone_no:'251-661-5362', status: WrDocumentStatus.DRAFT, address:'Some address 2'},
      {id:'WR 3', start_date:new Date("2020-02-16"), phone_no:'351-661-3252', status: WrDocumentStatus.DRAFT, address:'Some address 3'},
      {id:'WR 4', start_date:new Date("2021-01-02"), phone_no:'251-661-5362', status: WrDocumentStatus.DRAFT, address:'Some address 4'},
      {id:'WR 5', start_date:new Date("2021-01-01"), phone_no:'352-758-3154', status: WrDocumentStatus.DRAFT, address:'Some address 5'},
      {id:'WR 6', start_date:new Date(), phone_no:'351-661-1234', status: WrDocumentStatus.DRAFT, address:'Some address 6'},
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
}

