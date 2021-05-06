import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../common/mat-table/table-column';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-safety-documents',
  templateUrl: './safety-documents.component.html',
  styleUrls: ['./safety-documents.component.css']
})
export class SafetyDocumentsComponent implements OnInit {
  toggleAll: boolean;
  toggleMine: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
  }

  showAllData(){
    
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    
    this.toggleAll = false;
    this.toggleMine = true;
  }

}
