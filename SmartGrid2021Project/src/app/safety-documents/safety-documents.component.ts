import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../common/mat-table/table-column';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';

export interface SafetyDocument{
  id:string;
  startDate:Date;
  phoneNo:string;
  status:string;
  address:string;
}


@Component({
  selector: 'app-safety-documents',
  templateUrl: './safety-documents.component.html',
  styleUrls: ['./safety-documents.component.css']
})
export class SafetyDocumentsComponent implements OnInit {
  toggleAll: boolean;
  toggleMine: boolean;
  displayedColumns: string[] = ['id','startDate','phoneNo','status','address'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  SafetyDocuments_examplesALL: SafetyDocument[] = [
    {id: "WR1", startDate: new Date() , phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "WR3", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "WR2", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "WR6", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "WR7", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test" },
    {id: "61111", startDate: new Date("2021-02-16") , phoneNo: "255-256-256",status: "YotImplemented", address: "Mdressa neka neka"},
    {id: "71111", startDate: new Date("2021-04-16") , phoneNo: "255-258-256",status: "BotImplemented", address: "Rdressa neka neka"},
    {id: "81111", startDate: new Date("2021-01-15") , phoneNo: "255-257-256",status: "EotImplemented", address: "Adressa neka neka"},
    {id: "91111", startDate: new Date("2021-01-16"), phoneNo: "255-259-256",status: "NotImplemented", address: "Adressa neka neka"},
    {id: "11111", startDate: new Date(), phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "21111", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "31111", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "41111", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "51111", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Ndressa neka neka"},
    {id: "61111", startDate: new Date("2021-02-16") , phoneNo: "255-256-256",status: "YotImplemented", address: "Mdressa neka neka"},
    {id: "71111", startDate: new Date("2021-04-16"), phoneNo: "255-258-256",status: "BotImplemented", address: "Rdressa neka neka"},
    {id: "81111", startDate: new Date("2021-01-15") , phoneNo: "255-257-256",status: "EotImplemented", address: "Adressa neka neka"},
    {id: "91111", startDate: new Date("2021-01-16") , phoneNo: "255-259-256",status: "NotImplemented", address: "Adressa neka neka"},
  ]

  SafetyDocuments_examplesMINE: SafetyDocument[] = [
    {id: "11111", startDate: new Date() , phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "21111", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "31111", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "41111", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "51111", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Ndressa neka neka"},
    
    {id: "71111", startDate: new Date("2021-04-16") , phoneNo: "255-258-256",status: "BotImplemented", address: "Rdressa neka neka"},
    {id: "81111", startDate: new Date("2021-01-15") , phoneNo: "255-257-256",status: "EotImplemented", address: "Adressa neka neka"},
    {id: "91111", startDate: new Date("2021-01-16") , phoneNo: "255-259-256",status: "NotImplemented", address: "Adressa neka neka"},
    
  ]
  
  dataSource: MatTableDataSource<SafetyDocument>;
  sortedData: SafetyDocument[];
  safetyDocuments: SafetyDocument[];

  constructor() { }

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
    this.safetyDocuments = this.SafetyDocuments_examplesALL;
    this.dataSource = new MatTableDataSource(this.safetyDocuments);
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



  showAllData(){
    this.safetyDocuments = this.SafetyDocuments_examplesALL;
    this.dataSource.data = this.safetyDocuments;
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.safetyDocuments = this.SafetyDocuments_examplesMINE;
    this.dataSource.data = this.safetyDocuments;
    this.toggleAll = false;
    this.toggleMine = true;
  }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}