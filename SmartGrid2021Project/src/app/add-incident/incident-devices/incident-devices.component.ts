import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';

enum DeviceType{
  Breaker= "Breaker",
  Disconnector = "Disconnector",
  Break = "Break",
  Fuse = "Fuse",
  Switch = "Switch"
}

export interface Device{
  id:string;
  name:string;
  type:DeviceType;
  coordinates:string;
  address:string;
}

@Component({
  selector: 'app-incident-devices',
  templateUrl: './incident-devices.component.html',
  styleUrls: ['./incident-devices.component.css']
})




export class IncidentDevicesComponent implements OnInit {
  WRTableColumns: TableColumn[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllDevices:Device[]=[
    {id:"device1",name:"device1name",type:DeviceType.Breaker,coordinates:"xyz",address:"AdresaDevice1"},
    {id:"device3",name:"device3name",type:DeviceType.Switch,coordinates:"xyz",address:"AdresaDevice3"},
    {id:"device6",name:"device6name",type:DeviceType.Break,coordinates:"xyz",address:"AdresaDevice6"},
    {id:"device2",name:"device4name",type:DeviceType.Fuse,coordinates:"xyz",address:"AdresaDevice5"},
    {id:"device8",name:"device2name",type:DeviceType.Disconnector,coordinates:"xyz",address:"AdresaDevice10"},
    {id:"device9",name:"device9name",type:DeviceType.Breaker,coordinates:"xyz",address:"AdresaDevice11"},
  ]
  Devices:Device[];
  initializeColumns(): void{
    this.WRTableColumns = [
    {
      name: 'ID',
      dataKey: 'id',
      isSortable: true,
      position: 'left'
    
    },
    {
      name: 'NAME',
      dataKey: 'name',
      isSortable: true,
      position: 'left'
    },
    {
      name: 'TYPE',
      dataKey: 'type',
      isSortable: true,
      position: 'left',
      
    },
    {
      name: 'COORDINATES',
      dataKey: 'coordinates',
      isSortable: true,
      position: 'left',
     
    },
    {
      name: 'ADDRESS',
      dataKey: 'address',
      isSortable: true,
      position: 'left',
     
    }
    ];
  }
  
  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      return this.Devices = this.Devices.sort((a,b) => {return compare(a[keyName],b[keyName],true)});
    } 
    else if (sortParameters.direction === 'desc') {
      return this.Devices = this.Devices.sort((a,b) => {return compare(a[keyName],b[keyName], false)});
    } else 
    {
      return this.Devices = this.AllDevices.slice();
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.Devices = this.AllDevices.slice();
    this.initializeColumns();
  }
  showOnMap(row:any){
    console.log(row.id);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
