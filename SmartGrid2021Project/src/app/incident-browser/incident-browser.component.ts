import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../common/mat-table/table-column';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';

export interface Incident{
  id:string;
  startDate:Date;
  phoneNo:string;
  status:string;
  address:string;
}

@Component({
  selector: 'app-incident-browser',
  templateUrl: './incident-browser.component.html',
  styleUrls: ['./incident-browser.component.css']
})
export class IncidentBrowserComponent implements OnInit {
  
  displayedColumns: string[] = ['id','startDate','phoneNo','status','address']
  dataSource: MatTableDataSource<Incident>;
  toggleAll: boolean;
  toggleMine: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  incidents_examplesALL: Incident[] = [
    {id: "11111", startDate: new Date() , phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "21111", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "31111", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "41111", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "51111", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test Scroll bar test" },
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

  incidents_examplesMINE: Incident[] = [
    {id: "11111", startDate: new Date() , phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "21111", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "31111", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "41111", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "51111", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Ndressa neka neka"},
    
    {id: "71111", startDate: new Date("2021-04-16") , phoneNo: "255-258-256",status: "BotImplemented", address: "Rdressa neka neka"},
    {id: "81111", startDate: new Date("2021-01-15") , phoneNo: "255-257-256",status: "EotImplemented", address: "Adressa neka neka"},
    {id: "91111", startDate: new Date("2021-01-16") , phoneNo: "255-259-256",status: "NotImplemented", address: "Adressa neka neka"},
    
  ]


  sortedData: Incident[];
  constructor() {
    this.dataSource = new MatTableDataSource(this.incidents_examplesALL);
   }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  showAllData(){
    this.dataSource.data = this.incidents_examplesALL;
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.dataSource.data = this.incidents_examplesMINE;
    this.toggleAll = false;
    this.toggleMine = true;
  }
}

