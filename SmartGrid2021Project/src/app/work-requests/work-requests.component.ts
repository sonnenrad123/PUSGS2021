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
  filterValue = 'gogo';
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  workRequests: WorkRequest[];
  workRequestsCopy: WorkRequest[];
  constructor(private router: Router, private wrService: WorkRequestsService) { 
  }
  

  ngOnInit(): void {
    this.isLoading = true;
    this.toggleAll = true;
    this.toggleMy = false;
    this.loadWRs();  
  }
 
  loadWRs(){
    this.wrService.getAllWRs(this.currentPage, this.pageSize, this.filterValue).subscribe(
      (response: HttpResponse<WorkRequest[]>) => {
        //console.log(response);
        this.workRequests = response.body;
        this.workRequestsCopy = response.body;
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
    this.workRequests = this.workRequestsCopy;
    
  }
  showMyWorkRequests(){
    this.toggleAll = false;
    this.toggleMy = true;
    this.workRequests = this.workRequestsCopy.filter(wr => wr.createdBy.toString() === localStorage.getItem('user'));
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
