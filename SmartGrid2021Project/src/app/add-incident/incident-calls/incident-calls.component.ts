import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTab } from '@angular/material/tabs';

export interface Call{
  callId:string;
  reason:string;
  hazard:string;
  comment:string;
}

@Component({
  selector: 'app-incident-calls',
  templateUrl: './incident-calls.component.html',
  styleUrls: ['./incident-calls.component.css']
})
export class IncidentCallsComponent implements OnInit {
  displayedColumns: string[] = ['callId','reason','hazard','comment'];
  NewCallToggle: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllCalls:Call[]=[]
  dataSource: MatTableDataSource<Call>;
  sortedData: Call[];
  

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.AllCalls);
  }

  ngOnInit(): void {
    
    this.NewCallToggle = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showOnMap(row:any){
    console.log(row.callId);
  }

  toggleNew(){
    this.NewCallToggle = !this.NewCallToggle;
    console.log('toggled');
  }

  
  
  
  
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
