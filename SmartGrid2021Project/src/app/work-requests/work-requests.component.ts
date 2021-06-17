import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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

  displayedColumns: string[] = ['customId','startDateTime','phoneNo','statusOfDocument','street'];
  dataSource: MatTableDataSource<WorkRequest>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  workRequests: WorkRequest[];
  
  constructor(private router: Router, private wrService: WorkRequestsService) { 
  }
  

  ngOnInit(): void {
    this.isLoading = true;
    this.toggleAll = true;
    this.toggleMy = false;
    this.loadWRs();  
  }
 
  loadWRs(){
    this.wrService.getAllWRs(this.currentPage, this.pageSize).subscribe(
      (response: HttpResponse<WorkRequest[]>) => {
        //console.log(response);
        this.workRequests = response.body;
        this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
        this.dataSource = new MatTableDataSource(this.workRequests);
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;

      }
      );
  }

  openWR($event){
    this.router.navigate(['createworkrequest/BasicInfo'], {queryParams: {wr: $event.wR_id}});
  }
  showAllWorkRequests(){
    this.toggleAll = true;
    this.toggleMy = false;
    this.wrService.getAllWRs(this.currentPage, this.pageSize).subscribe(
      (response: HttpResponse<WorkRequest[]>) => {
        //console.log(response.body);
        this.workRequests = response.body;
        this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
        this.dataSource = new MatTableDataSource(this.workRequests);
        this.isLoading = false;
        

      },
      (err) => {
        console.log(err);
        this.isLoading = false;

      }
      );
    
  }
  showMyWorkRequests(){
    this.toggleAll = false;
    this.toggleMy = true;
    this.wrService.getAllWRs(this.currentPage, this.pageSize).subscribe(
      (response: HttpResponse<WorkRequest[]>) => {
        //console.log(response);
        this.workRequests = response.body;
        this.workRequests = this.workRequests.filter(item1 => item1.createdBy.toString() === localStorage.getItem('user').toString());
        this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
        this.dataSource = new MatTableDataSource(this.workRequests);
        this.isLoading = false;

      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
      );
  }
  
  CreateNewWR(){
    this.router.navigate(['/createworkrequest']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex+1;
    this.pageSize = event.pageSize;
    this.loadWRs();
  }

  
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
