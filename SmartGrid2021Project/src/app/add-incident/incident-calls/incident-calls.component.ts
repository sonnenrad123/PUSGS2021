import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';

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
  WRTableColumns: TableColumn[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllCalls:Call[]=[
    {callId:"255 255 139",reason:"NotImplemented2",hazard:"notimplemented3",comment:""},
    {callId:"255 255 129",reason:"NotImplemented1",hazard:"notimplemented2",comment:"SomeComment"},
    {callId:"255 255 119",reason:"NotImplemented3",hazard:"notimplemented1",comment:"SomeComment"},
    {callId:"255 255 159",reason:"NotImplemented5",hazard:"notimplemented7",comment:"SomeComment"},
    {callId:"255 255 199",reason:"NotImplemented4",hazard:"notimplemented6",comment:""},
    {callId:"255 255 179",reason:"NotImplemented8",hazard:"notimplemented4",comment:""},
  ]
  Calls:Call[];

  initializeColumns(): void{
    this.WRTableColumns = [
    {
      name: 'Call Id',
      dataKey: 'callId',
      isSortable: true,
      position: 'left'
    
    },
    {
      name: 'Reason',
      dataKey: 'reason',
      isSortable: true,
      position: 'left'
    
    },
    {
      name: 'Hazard',
      dataKey: 'hazard',
      isSortable: true,
      position: 'left'
    
    },
    {
      name: 'Comment',
      dataKey: 'comment',
      isSortable: false,
      position: 'left'
    
    }];
    
  }

  constructor() { }

  ngOnInit(): void {
    this.Calls = this.AllCalls.slice();
    this.initializeColumns();
  }
  showOnMap(row:any){
    console.log(row.id);
  }

}
