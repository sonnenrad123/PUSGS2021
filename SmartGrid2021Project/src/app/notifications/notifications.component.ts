import { style } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Incident } from '../incident-browser/incident-browser.component';
import { IncidentServiceService } from '../services/incident/incident-service.service';
import { NotificationService } from '../services/notification/notification.service';
import { SwitchingPlanService } from '../services/switching-plan/switching-plan.service';

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

  displayedColumns: string[] = ['icon', 'type' ,'desc', 'open', 'date'];
  types: string[] = ['All', 'Info', 'Warning', 'Error', 'Success'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allNotifications:Notification[];
  
  buttonDraw:boolean=false;

  filteredData: Notification[];
  searchData: Notification[];
  dataSource: MatTableDataSource<Notification>;
  sortedData: Notification[];;
  responseData:any[];
  notifications:Notification[];
  incident:Incident;


  constructor(private NotificationService:NotificationService,
              private IncidentService:IncidentServiceService,
              private RouterObject:Router, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.readData();
  }

  isValid(row:any){
      let styles = {
        'display' : 'none'
      };
      this.allNotifications.forEach(not => {
        if(not.id == row.id){
          if(not.inc != null){
            styles = {
              'display' : 'block'
            };
          }
          else if(not.sp != null){
            styles = {
              'display' : 'block'
            };
          }
          else if(not.sd != null){
            styles = {
              'display' : 'block'
            };
          }
          else if(not.wr != null){
            styles = {
              'display' : 'block'
            };
          }
        }
      });
      return styles;
    
  }

  buttonClick(row:any){
    this.allNotifications.forEach(not => {
      if(not.id == row.id){
        if(not.inc != null){
          this.RouterObject.navigate(["AddIncident/"+not.inc]);
        }else if(not.sd !=null){
          this.RouterObject.navigate(["AddSafetyDocument/"+not.sd]);
        }else if(not.sp != null){
          this.RouterObject.navigate(["AddSwitchingPlan/"+not.sp]);
        }else if(not.wr != null){
          this.RouterObject.navigate(["createworkrequest/"+not.wr]);
        }
      }
    });
  }

  clickedOnRow(row:any){
    this.allNotifications.forEach(not => {
      if(not.id == row.id){
        if(not.color != "#F0F0F0"){
        not.color = "#F0F0F0";
        this.NotificationService.modifyNotification(not.id, not).subscribe(
          response =>{
          },
          error => {
            console.log(error);
          });
        }
      }
    });
  }

  markAllUnread(){
    this.allNotifications.forEach(not=>{
      not.color = "#F0F0F0";
      this.NotificationService.modifyNotification(not.id, not).subscribe(
        response =>{
          this._snackBar.open('Marked all notifications as read!','Ok');
        },
        error => {
          console.log(error);
        });
      });
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

      else if(this.filteredData[i].wr != null)
        if(this.filteredData[i].wr.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      else if(this.filteredData[i].sp != null)
        if(this.filteredData[i].sp.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      else if(this.filteredData[i].sd != null)
        if(this.filteredData[i].sd.toLowerCase().includes(searchTerm.trim().toLowerCase())){
          this.searchData.push(this.filteredData[i]);
        }

      else if(this.filteredData[i].wr != null)
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
