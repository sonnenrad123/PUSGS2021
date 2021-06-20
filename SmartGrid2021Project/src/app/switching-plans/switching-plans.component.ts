import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwitchingPlanService } from '../services/switching-plan/switching-plan.service';

export interface SwitchingPlan{
    id :string;
    typeOfDocument : string;
    warrantForWork : string;
    status : string;
    incident  : string;
    street : string;
    startDateTime : Date;
    endDateTime : Date;
    team : string;
    createdBy : string;
    purpose : string;
    notes: string;
    company : string;
    phoneNo : number;
    dateTimeCreated : Date;
}

@Component({
  selector: 'app-switching-plans',
  templateUrl: './switching-plans.component.html',
  styleUrls: ['./switching-plans.component.css']
})
export class SwitchingPlansComponent implements OnInit {

  toggleAll: boolean;
  toggleMine: boolean;
  displayedColumns: string[] = 
  [
  'id',
  'typeOfDocument',
  'warrantForWork',
  'status',
  'incident',
  'street',
  'startDateTime',
  'endDateTime',
  'team',
  'createdBy',
  'purpose',
  'notes',
  'company',
  'phoneNo',
  'dateTimeCreated'
  ];
  dataSource: MatTableDataSource<SwitchingPlan>;
  sortedData: SwitchingPlan[];
  switchingPlans: SwitchingPlan[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  responseData : any[];
  constructor(private SwitchingPlanService: SwitchingPlanService) { }

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
    this.readData();
  }

  ngAfterViewInit(){
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
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
    this.SwitchingPlanService.getSwitchingPlans().subscribe(
      switchingPlans => {
        this.responseData = switchingPlans;
        console.log(switchingPlans);
        this.mapData();
      },
      error => {
        console.log(error);
      }
    );
  }

  mapData(){
    var ss = JSON.stringify(this.responseData);
    
    this.switchingPlans = JSON.parse(ss).map(item => ({
      id : item.customId,
      typeOfDocument : item.typeOfDocument,
      warrantForWork : item.warrantForWork,
      status : item.status,
      incident  : item.incident ,
      street : item.street,
      startDateTime : item.startDateTime,
      endDateTime : item.endDateTime,
      team : item.team,
      createdBy : item.createdBy,
      purpose : item.purpose,
      notes: item.notes,
      company : item.company,
      phoneNo : item.phoneNo,
      dateTimeCreated : item.dateTimeCreated,
    }));
    this.dataSource = new MatTableDataSource(this.switchingPlans);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mapMineData(){
    //let userEmail = localStorage.getItem('user');
    //this.switchingPlans = this.switchingPlans.filter(x => x.creatorEmail == userEmail);
    this.dataSource = new MatTableDataSource(this.switchingPlans);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  };

}
