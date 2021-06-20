import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../common/mat-table/table-column';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { SafetyDocumentService } from '../services/safety-documents/safety-document.service';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/user-account/user-account.service';

export interface SafetyDocument{
  id:string;
  type:string;
  safetyDocType:string;
  phoneNo:string;
  status:string;
  dateTimeCreated:string;
  details:string;
  notes:string;
  workCompleted:boolean;
  tagsRemoved:boolean;
  groundingRemoved:boolean;
  readyForService:boolean;
  creatorEmail:string;
  creator:any;
}


@Component({
  selector: 'app-safety-documents',
  templateUrl: './safety-documents.component.html',
  styleUrls: ['./safety-documents.component.css']
})
export class SafetyDocumentsComponent implements OnInit {
  toggleAll: boolean;
  toggleMine: boolean;
  displayedColumns: string[] = ['id','type','safetyDocType','dateTimeCreated','details','notes','workCompleted','tagsRemoved','groundingRemoved','readyForService'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  responseData:any;
  SafetyDocuments:SafetyDocument[];
  
  dataSource: MatTableDataSource<SafetyDocument>;
  sortedData: SafetyDocument[];
  role:string;

  constructor(private router:Router,private SafetyDocService:SafetyDocumentService, private serviceSecurity: UserAccountService) { }

  ngOnInit(): void {
    this.role = this.serviceSecurity.getRole();
    this.toggleAll = true;
    this.toggleMine = false;
    this.readData();
  }
  getSafetyDoc(row){
    
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readData(){
    this.SafetyDocService.getSafetyDocuments().subscribe(
      incidents => {
        this.responseData = incidents;
        console.log(incidents);
        this.mapData();
      },
      error => {
        console.log(error);
      }
    );
    
  }

  mapData(){
    
    this.SafetyDocuments = this.responseData;
    this.dataSource = new MatTableDataSource(this.SafetyDocuments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mapMineData(){
    let userEmail = localStorage.getItem('user');
    this.SafetyDocuments = this.SafetyDocuments.filter(x => x.creator.email == userEmail);
    this.dataSource = new MatTableDataSource(this.SafetyDocuments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  showAllData(){
    this.mapData();
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.mapMineData();
    this.toggleAll = false;
    this.toggleMine = true;
  }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}