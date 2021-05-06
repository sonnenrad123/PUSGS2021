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
  selector: 'app-safety-document-equipment',
  templateUrl: './safety-document-equipment.component.html',
  styleUrls: ['./safety-document-equipment.component.css']
})
export class SafetyDocumentEquipmentComponent implements OnInit {
  displayedColumns: string[] = ['id','name','type','address','location','remove'];
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

  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.AllDevices);
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

  showLocation(row:any){
    console.log('Show location for device with id: ' + row.id);
  }
  
  removeDevice(row:any){
    console.log('Delete device with id: ' + row.id);
  }

  

}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}