import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';
import { matTabsAnimations } from '@angular/material/tabs';
import {DeviceService} from '../services/device/device.service';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";

enum DeviceType{
  Breaker= "Breaker",
  Disconnector = "Disconnector",
  LoadBreak = "LoadBreak",
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
  selector: 'app-incident-devices-dialog',
  templateUrl: './incident-devices-dialog.component.html',
  styleUrls: ['./incident-devices-dialog.component.css']
})
export class IncidentDevicesDialogComponent implements OnInit {
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
  clickedRows = new Set<Device>();

  responseData:any[];

  constructor(private dialogRef: MatDialogRef<IncidentDevicesDialogComponent>,private DeviceService:DeviceService) { }

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
  AddDevice() {
    this.clickedRows.forEach(row => {
      this.selectedDevicesIds.push(row);
    });
    this.dialogRef.close(this.selectedDevicesIds);
  }

  RowClicked(row){
    if(this.clickedRows.has(row)){
      this.clickedRows.delete(row);
    }
    else{
      this.clickedRows.add(row);
    }
  }    
  
  readData(){
    this.DeviceService.getDevices().subscribe(
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

  close() {
    this.dialogRef.close();
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


