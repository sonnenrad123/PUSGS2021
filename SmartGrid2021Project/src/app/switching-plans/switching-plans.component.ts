import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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


  docType : any[] = ['Planned work', 'Unplanned work'];
  docStatus : any[] = ['Draft', 'Submitted'];
  docState: any[] = ['Approved', 'Denied', 'Canceled'];

  SwitchingPlansALL : SwitchingPlan[] = 
  [
    {
    id: '1',
    typeOfDocument : 'Planned work',
    warrantForWork : 'wfw1',
    status : 'Draft',
    incident  : 'Inc1',
    street : 'didnt street',
    startDateTime : new Date(),
    endDateTime : new Date(),
    team : 'team1',
    createdBy : 'todoo',
    purpose : "string",
    notes: "string",
    company : "ring",
    phoneNo : 1123,
    dateTimeCreated : new Date()
    }
  ]
  //test
  SwitchingPlansMine : SwitchingPlan[] = 
  [

  ]

  constructor() { }

  ngOnInit(): void {
    this.toggleAll = true;
    this.toggleMine = false;
    this.switchingPlans = this.SwitchingPlansALL;
    this.dataSource = new MatTableDataSource(this.switchingPlans);
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

  showAllData(){
    this.switchingPlans = this.SwitchingPlansALL;
    this.dataSource.data = this.switchingPlans;
    this.toggleAll = true;
    this.toggleMine = false;

  }
  showMineData(){
    this.switchingPlans = this.SwitchingPlansMine;
    this.dataSource.data = this.switchingPlans;
    this.toggleAll = false;
    this.toggleMine = true;
  }

}
