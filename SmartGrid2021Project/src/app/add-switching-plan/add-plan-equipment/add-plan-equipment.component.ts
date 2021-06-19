import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { isObservable } from 'rxjs';
import { DeviceLocationDialogComponent } from 'src/app/device-location-dialog/device-location-dialog.component';
import { IncidentDevicesDialogComponent } from 'src/app/incident-devices-dialog/incident-devices-dialog.component';

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
  selector: 'app-add-plan-equipment',
  templateUrl: './add-plan-equipment.component.html',
  styleUrls: ['./add-plan-equipment.component.css']
})


export class AddPlanEquipmentComponent implements OnInit {

  displayedColumns: string[] = ['id','name','type','address','location','remove'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AllDevices:Device[]=[];

  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];
  responseData: any[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.AllDevices);
    if(window.sessionStorage.getItem('switchingPlanSelectedEquipment')!=null){
      let data = JSON.parse(window.sessionStorage.getItem('switchingPlanSelectedEquipment'));
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
        if(data === undefined){}
        else if(data == 0){}
        else{
          window.sessionStorage.setItem('switchingPlanSelectedEquipment',JSON.stringify(data));
          this.AllDevices = data;
          this.dataSource = new MatTableDataSource(this.AllDevices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }
  
  removeDevice(row:any){
    let switchingPlanSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('switchingPlanSelectedEquipment'));
    switchingPlanSelectedDevicestemp.forEach((device,index) => {
      if(device.id == row.id){
        switchingPlanSelectedDevicestemp.splice(index,1);
      }
    });
    window.sessionStorage.setItem('switchingPlanSelectedEquipment',JSON.stringify(switchingPlanSelectedDevicestemp));
    this.AllDevices = switchingPlanSelectedDevicestemp;
    this.dataSource = new MatTableDataSource(this.AllDevices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
