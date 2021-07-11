import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkRequest } from '../models/work-request/work-request';
import { UserAccountService } from '../services/user-account/user-account.service';
import { WorkRequestsService } from '../services/work-request/work-requests.service';

@Component({
  selector: 'app-select-workreq-dialog',
  templateUrl: './select-workreq-dialog.component.html',
  styleUrls: ['./select-workreq-dialog.component.css']
})
export class SelectWorkreqDialogComponent implements OnInit {

  toggleAll: boolean;
  toggleMine: boolean;
  clickedRow:WorkRequest;
  displayedColumns: string[] = 
  [
  'customId','startDateTime','phoneNo','statusOfDocument','street'
  ];
  dataSource: MatTableDataSource<WorkRequest>;
  sortedData: WorkRequest[];
  workRequests: WorkRequest[];
  workRequestsCopy: WorkRequest[];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;
  filterValue = 'gogo';
  isLoading = true;
  role:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  responseData : any[];
  constructor(private userService: UserAccountService,private wrService: WorkRequestsService,private dialogRef: MatDialogRef<SelectWorkreqDialogComponent>) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
    this.isLoading = true;
    this.toggleAll = true;
    this.toggleMine = false;
    this.readData();
  }

  readData(){
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

  showAllWorkRequests(){
    this.toggleAll = true;
    this.toggleMine = false;
    this.workRequests = this.workRequestsCopy;
    this.dataSource = new MatTableDataSource(this.workRequests);
    
  }
  showMyWorkRequests(){
    this.toggleAll = false;
    this.toggleMine = true;
    this.workRequests = this.workRequestsCopy.filter(wr => wr.createdBy.toString() === localStorage.getItem('user'));
    this.dataSource = new MatTableDataSource(this.workRequests);
    console.log(this.workRequests);
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
    this.readData();
  }

  RowClicked(row){
    this.clickedRow = row;
    this.dialogRef.close(this.clickedRow);
  }

}
