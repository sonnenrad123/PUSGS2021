import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { IncidentDevicesDialogComponent } from 'src/app/incident-devices-dialog/incident-devices-dialog.component';
import { DeviceLocationDialogComponent } from 'src/app/device-location-dialog/device-location-dialog.component';
import { Router } from '@angular/router';

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

  AllDevices:Device[]=[]

  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];

  responseData:any[];
  constructor(private dialog: MatDialog,private RouterObject: Router,private dialog2: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.AllDevices);
    if(window.sessionStorage.getItem('safetyDocumentSelectedDevices')!=null){
      let data = JSON.parse(window.sessionStorage.getItem('safetyDocumentSelectedDevices'));
      this.AllDevices = data;
      this.dataSource = new MatTableDataSource(this.AllDevices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
    this.deviceLocationModalDialog(row);
  }
  
  removeDevice(row:any){
    let safetyDocumentSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('safetyDocumentSelectedDevices'));
    safetyDocumentSelectedDevicestemp.forEach((device,index) => {
      if(device.id == row.id){
        safetyDocumentSelectedDevicestemp.splice(index,1);
      }
    });
    window.sessionStorage.setItem('safetyDocumentSelectedDevices',JSON.stringify(safetyDocumentSelectedDevicestemp));
    this.AllDevices = safetyDocumentSelectedDevicestemp;
    this.dataSource = new MatTableDataSource(this.AllDevices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  devicesModalDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '800px';
    const dialogRef = this.dialog.open(IncidentDevicesDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        window.sessionStorage.setItem('safetyDocumentSelectedDevices',JSON.stringify(data));
        this.AllDevices = data;
        this.dataSource = new MatTableDataSource(this.AllDevices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    );
  }
  deviceLocationModalDialog(device:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '800px';
    dialogConfig.data = device;
    const dialogRef2 = this.dialog.open(DeviceLocationDialogComponent, dialogConfig);
    dialogRef2.afterClosed().subscribe(
      data => {
      }
      
    );
  }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}