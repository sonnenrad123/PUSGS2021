import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';

export interface Notification{
  id? : string;
  type: string;
  desc: string;
  date: Date;
  icon: string;
  color: string;
  wr? : string;
  sp? : string;
  sd? : string;
  inc? : string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = ['icon', 'desc', 'date'];
  types: string[] = ['All', 'Info', 'Warning', 'Error', 'Success'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allNotifications:Notification[];
  

  filteredData: Notification[];
  searchData: Notification[];
  dataSource: MatTableDataSource<Notification>;
  sortedData: Notification[];;
  
  responseData:any[];
  notifications:Notification[];


  constructor(private NotificationService:NotificationService,private RouterObject:Router) { }

  ngOnInit(): void {
    this.readData();
  }

  clickedOnRow(row:any){
    console.log("cliekedOnRow");
  }

  markAllUnread(){
    this.allNotifications.forEach(not=>{
      not.color = "#F0F0F0"
    })
    this.dataSource = new MatTableDataSource(this.responseData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  doSearch(ntype:string,searchTerm:string){
    
    if(ntype == undefined || ntype == 'All'){
      this.filteredData = this.allNotifications;
    }
    else{
      this.filteredData = [];
      for(let i = 0; i<this.allNotifications.length;i++){
        if(this.allNotifications[i].type == ntype){
            this.filteredData.push(this.allNotifications[i]);
        }
      }
    }

    this.searchData=[];

    for(let i = 0; i<this.filteredData.length;i++){
      if(this.filteredData[i].desc.toLowerCase().includes(searchTerm.trim().toLowerCase())){
        this.searchData.push(this.filteredData[i]);
      }

      if(this.filteredData[i].wr != null)
        if(this.filteredData[i].wr.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      if(this.filteredData[i].sp != null)
        if(this.filteredData[i].sp.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      if(this.filteredData[i].sd != null)
        if(this.filteredData[i].sd.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      if(this.filteredData[i].wr != null)
        if(this.filteredData[i].inc.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

    }
    this.dataSource = new MatTableDataSource(this.searchData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    
  }
  
  cancelSearch(){
    this.dataSource = new MatTableDataSource(this.allNotifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readData(){
    this.NotificationService.getNotifications().subscribe(
      not => {
        this.responseData = not;
        this.allNotifications = this.responseData;
        console.log(not);
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
