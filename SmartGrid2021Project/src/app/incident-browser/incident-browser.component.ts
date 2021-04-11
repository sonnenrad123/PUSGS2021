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
  displayedColumns: string[] = ['id','startDate','phoneNo','status','address'];
  toggleAll: boolean;
  toggleMine: boolean;
  WRTableColumns: TableColumn[];
  Incidents: Incident[];
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
    {id: "91111", startDate: new Date("2021-01-16") , phoneNo: "255-259-256",status: "NotImplemented", address: "Adressa neka neka"},
    {id: "11111", startDate: new Date() , phoneNo: "255-255-250",status: "AotImplemented", address: "Adressa neka neka"},
    {id: "21111", startDate: new Date() , phoneNo: "255-255-252",status: "XotImplemented", address: "Cdressa neka neka"},
    {id: "31111", startDate: new Date("2019-01-16") , phoneNo: "255-255-251",status: "DotImplemented", address: "Bdressa neka neka"},
    {id: "41111", startDate: new Date("2020-01-16") , phoneNo: "255-255-253",status: "CtImplemented", address: "Ddressa neka neka"},
    {id: "51111", startDate: new Date("2021-03-16") , phoneNo: "255-255-258",status: "NotImplemented", address: "Ndressa neka neka"},
    {id: "61111", startDate: new Date("2021-02-16") , phoneNo: "255-256-256",status: "YotImplemented", address: "Mdressa neka neka"},
    {id: "71111", startDate: new Date("2021-04-16") , phoneNo: "255-258-256",status: "BotImplemented", address: "Rdressa neka neka"},
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
      dataKey: 'startDate',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'PHONE NO.',
      dataKey: 'phoneNo',
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

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      return this.Incidents= this.Incidents.sort((a: Incident, b: Incident) => a[keyName].localeCompare(b[keyName]));
    } 
    else if (sortParameters.direction === 'desc') {
      return this.Incidents = this.Incidents.sort((a: Incident, b: Incident) => b[keyName].localeCompare(a[keyName]));
    } else 
    {
      if(this.toggleAll){
        return this.Incidents= this.incidents_examplesALL;
      }
      else{
        return this.Incidents = this.incidents_examplesMINE;
      }
    }
  }

 

  sortedData: Incident[];
  constructor() {

   }

  ngAfterViewInit(){
    
  } 

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
    this.Incidents = this.incidents_examplesALL;
    this.initializeColumns();
  }

  removeOrder(incident: Incident) {
    this.Incidents = this.Incidents.filter(item => item.id !== incident.id)
  }
  
  showAllData(){
    this.Incidents = this.incidents_examplesALL;
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.Incidents = this.incidents_examplesMINE;
    this.toggleAll = false;
    this.toggleMine = true;
  }
}


