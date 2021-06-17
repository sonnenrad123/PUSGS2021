import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableColumn } from '../common/mat-table/table-column';
import { WorkRequest } from '../models/work-request/work-request';
import { WrDocumentStatus } from '../models/wr-document-status/wr-document-status.enum';
import { WorkRequestsService } from '../services/work-request/work-requests.service';
import { AddWorkRequestComponent } from './add-work-request/add-work-request.component';

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
  workReqFromServer: Array<any> = new Array<any>();

  constructor(private router: Router, private wrService: WorkRequestsService) { 
  }
  

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMy = false;
    this.initializeColumns();
    this.wrService.getAllWRs().subscribe(
      (data) => {
        //console.log(data);
        this.workRequests = data;
      },
      (err) => {
        console.log(err);
      }
    );
    
  }
  openWR($event){
    this.router.navigate(['createworkrequest/BasicInfo'], {queryParams: {wr: $event.wR_id}});
  }
  showAllWorkRequests(){
    this.toggleAll = true;
    this.toggleMy = false;
    this.wrService.getAllWRs().subscribe(
      (data) => {
        //console.log(data);
        this.workRequests = data;
      },
      (err) => {
        console.log(err);
      }
      );
    
  }
  showMyWorkRequests(){
    this.toggleAll = false;
    this.toggleMy = true;
    this.wrService.getAllWRs().subscribe(
      (data) => {
        console.log(data);
        this.workRequests = data.filter(item1 => item1.createdBy.toString() === localStorage.getItem('user').toString());
      },
      (err) => {
        console.log(err);
      }
      );
  }
  
  CreateNewWR(){
    this.router.navigate(['/createworkrequest']);
  }
  
  initializeColumns(): void{
    this.WRTableColumns = [
    {
      name: 'ID',
      dataKey: 'customId',
      isSortable: true,
      position: 'left',
      isSticky: true
    },
    {
      name: 'START DATE',
      dataKey: 'startDateTime',
      isSortable: true,
      position: 'left',
      isSticky: true
    },
    {
      name: 'PHONE NO.',
      dataKey: 'phoneNo',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'STATUS',
      dataKey: 'statusOfDocument',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'ADDRESS',
      dataKey: 'street',
      isSortable: true,
      position: 'left'
    }
  ];
  }
}

