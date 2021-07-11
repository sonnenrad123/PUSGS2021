import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device, IncidentDevicesDialogComponent } from '../incident-devices-dialog/incident-devices-dialog.component';
import { DeviceService } from '../services/device/device.service';

@Component({
  selector: 'app-select-device-dialog',
  templateUrl: './select-device-dialog.component.html',
  styleUrls: ['./select-device-dialog.component.css']
})
export class SelectDeviceDialogComponent implements OnInit {

  displayedColumns: string[] = ['id','name','type','address','coordinates'];
  deviceTypes: string[] = ['All','Breaker','Disconnector','LoadBreak','Fuse','Switch'];
  deviceAttributes: string[] = ['Id','Name','Coordinates','Address'];
  selectedDevicesIds:any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllDevices:Device[]=[];

  filteredData: Device[];
  searchData: Device[];
  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];
  clickedRow: Device;

  responseData:any[];

  constructor(private dialogRef: MatDialogRef<IncidentDevicesDialogComponent>,private deviceService:DeviceService) { }

  ngOnInit(): void {
    this.readData();
  }

  ngAfterViewInit(){
    
  }

  doSearch(deviceType:string,selectedAttribute:string,searchTerm:string){
    
    //prvo sredimo tip
    if(deviceType == undefined || deviceType == 'All'){
      this.filteredData = this.AllDevices;
    }
    else{
      this.filteredData = [];
      for(let i = 0; i<this.AllDevices.length;i++){
        if(this.AllDevices[i].type.toString() == deviceType){
            this.filteredData.push(this.AllDevices[i]);
        }
      }
    }

    //sada gledamo koji tacno atribut searchujemo i pretrazujemo samo odredjeni tip
    this.searchData=[];

    
    switch(selectedAttribute){
      case 'Name':
        for(let i = 0; i<this.filteredData.length;i++){
          if(this.filteredData[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            this.searchData.push(this.filteredData[i]);
          }
        }
      break;
      case 'Id':
        for(let i = 0; i<this.filteredData.length;i++){
          if(this.filteredData[i].id.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            this.searchData.push(this.filteredData[i]);
          }
        }
      break;
      case 'Address':
        for(let i = 0; i<this.filteredData.length;i++){
          if(this.filteredData[i].address.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            this.searchData.push(this.filteredData[i]);
          }
        }
      break;
      case 'Coordinates':
        for(let i = 0; i<this.filteredData.length;i++){
          if(this.filteredData[i].coordinates.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            this.searchData.push(this.filteredData[i]);
          }
        }
      break;
      default:
        for(let i = 0; i<this.filteredData.length;i++){
          if(this.filteredData[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            this.searchData.push(this.filteredData[i]);
          }
        }
    }

    

    this.dataSource = new MatTableDataSource(this.searchData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    
  }
  cancelSearch(){
    this.dataSource = new MatTableDataSource(this.AllDevices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  RowClicked(row){
    this.clickedRow = row;
    this.dialogRef.close(this.clickedRow);
  }    
  
  readData(){
    this.deviceService.getDevices().subscribe(
      incidents => {
        this.responseData = incidents;
        this.AllDevices = this.responseData;
        console.log(incidents);
        this.dataSource = new MatTableDataSource(this.responseData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
    
}

}

