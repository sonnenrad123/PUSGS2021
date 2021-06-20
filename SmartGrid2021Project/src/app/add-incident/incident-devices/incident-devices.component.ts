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
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

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
  displayedColumns: string[] = ['id','name','type','address','location','remove'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllDevices:Device[]=[];
  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];
  
  role:string;

  responseData:any[];

  constructor(private dialog: MatDialog,private RouterObject: Router,private dialog2: MatDialog, private userAcc: UserAccountService) { }

  ngOnInit(): void {
    this.role = this.userAcc.getRole();
    this.dataSource = new MatTableDataSource(this.AllDevices);
    if(window.sessionStorage.getItem('incidentSelectedDevices')!=null){
      let data = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
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
    //console.log('Show location for device with id: ' + row.id);
    //this.RouterObject.navigate(["/map",row.id]);
    this.deviceLocationModalDialog(row);
  }
  
  removeDevice(row:any){
    let incidentSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
    incidentSelectedDevicestemp.forEach((device,index) => {
      if(device.id == row.id){
        incidentSelectedDevicestemp.splice(index,1);
      }
    });
    window.sessionStorage.setItem('incidentSelectedDevices',JSON.stringify(incidentSelectedDevicestemp));
    this.AllDevices = incidentSelectedDevicestemp;
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
        window.sessionStorage.setItem('incidentSelectedDevices',JSON.stringify(data));
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
