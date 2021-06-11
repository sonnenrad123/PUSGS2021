import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/common/mat-table/table-column';
import { MatTab, matTabsAnimations } from '@angular/material/tabs';
import { DeviceService} from '../services/device/device.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DeviceLocationDialogComponent } from 'src/app/device-location-dialog/device-location-dialog.component';
import { Router } from '@angular/router';
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
  selector: 'app-search-network-elements',
  templateUrl: './search-network-elements.component.html',
  styleUrls: ['./search-network-elements.component.css']
})
export class SearchNetworkElementsComponent implements OnInit {
  displayedColumns: string[] = ['id','name','type','address','coordinates','location','remove'];
  deviceTypes: string[] = ['All','Breaker','Disconnector','LoadBreak','Fuse','Switch'];
  deviceAttributes: string[] = ['Id','Name','Coordinates','Address'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AllDevices:Device[];
  

  filteredData: Device[];
  searchData: Device[];
  dataSource: MatTableDataSource<Device>;
  sortedData: Device[];
  
  responseData:any[];
  Devices:Device[];

  constructor(private DeviceService:DeviceService,private RouterObject:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.readData();
  }

  ngAfterViewInit(){
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  showLocation(row:any){
    //console.log('Show location for device with id: ' + row.id);
    //this.RouterObject.navigate(["/map",row.id]);
    this.deviceLocationModalDialog(row);
  }
  
  deviceLocationModalDialog(device:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '800px';
    dialogConfig.data = device;
    const dialogRef = this.dialog.open(DeviceLocationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
      }
      
    );
  }




  removeDevice(row:any){
    console.log('Delete device with id: ' + row.id);
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

}


function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}