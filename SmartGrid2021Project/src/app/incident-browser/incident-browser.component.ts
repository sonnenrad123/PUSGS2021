import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../common/mat-table/table-column';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {IncidentServiceService } from '../services/incident/incident-service.service';
import { MatTab } from '@angular/material/tabs';
import { V4MAPPED } from 'node:dns';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/user-account/user-account.service';
export interface Incident{
  id:string;
  startDate:Date;
  phoneNo:string;
  status:string;
  address:string;
  cause:string;
  subcause:string;
  constructionType:string;
  description:string;
  ETA:Date;
  ATA:Date;
  voltage:any;
  calls:any;
  material:string;
  incidentType:string;
  creatorEmail:string;
}

@Component({
  selector: 'app-incident-browser',
  templateUrl: './incident-browser.component.html',
  styleUrls: ['./incident-browser.component.css']
})
export class IncidentBrowserComponent implements OnInit {
  
  displayedColumns: string[] = ['id','startDate','phoneNo','status','address','incidentType','cause','subcause','constructionType','description','ETA','ATA','voltage','calls'];
  dataSource: MatTableDataSource<Incident>;
  toggleAll: boolean;
  toggleMine: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  responseData:any;
  Incidents:Incident[];

  sortedData: Incident[];
  role:string;
  constructor(private IncidentService: IncidentServiceService,private router:Router, private userService: UserAccountService) {

  }

  ngAfterViewInit(){
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {
    this.role = this.userService.getRole();
    this.toggleAll = true;
    this.toggleMine = false;
    this.readData();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  showAllData(){
    this.mapData();
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.mapMineData();
    this.toggleAll = false;
    this.toggleMine = true;
  }

  readData(){
      this.IncidentService.getIncidents().subscribe(
        incidents => {
          this.responseData = incidents;
          console.log(incidents);
          this.mapData();
        },
        error => {
          console.log(error);
        }
      );
      
  }
    
  mapData(){
    var ss = JSON.stringify(this.responseData);
    
    this.Incidents = JSON.parse(ss).map(item => ({
      id:item.customId,
      startDate:item.outageTime, 
      phoneNo:item.phoneNo,
      status:item.status,
      address:item.devices[0].address,
      cause:item.cause,
      subcause:item.subcause,
      ETA:item.eta,
      ATA:item.ata,
      constructionType:item.constructionType,
      description:item.incidentDesc,
      voltage:item.voltage,
      calls:item.calls,
      incidentType:item.incidentType,
      creatorEmail:item.user.email
    }));
    this.dataSource = new MatTableDataSource(this.Incidents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mapMineData(){
    let userEmail = localStorage.getItem('user');
    this.Incidents = this.Incidents.filter(x => x.creatorEmail == userEmail);
    this.dataSource = new MatTableDataSource(this.Incidents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getIncident(row){
    var id = row.id.replace('INC','');
    this.router.navigate(["AddIncident/"+id]);
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}