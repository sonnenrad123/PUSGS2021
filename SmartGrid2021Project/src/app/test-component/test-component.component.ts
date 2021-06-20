import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { WorkRequestsService } from '../services/work-request/work-requests.service';
import { IncidentServiceService } from '../services/incident/incident-service.service';
import { SwitchingPlanService } from '../services/switching-plan/switching-plan.service';
import { SafetyDocumentService } from '../services/safety-documents/safety-document.service';
@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  WRCount:number = 0;
  WRDraftsCount:number = 0;
  WRCanceledCount:number = 0;
  WRExecCount:number = 0;
  WRCompCount:number = 0;

  WPCount:number = 0;
  WPDraftsCount:number = 0;
  WPCanceledCount:number = 0;
  WPExecCount:number = 0;
  WPCompCount:number = 0;

  SDCount:number = 0;
  SDDraftsCount:number = 0;
  SDCanceledCount:number = 0;
  SDExecCount:number = 0;
  SDCompCount:number = 0;

  SPCount:number = 0;
  SPDraftsCount:number = 0;
  SPCanceledCount:number = 0;
  SPExecCount:number = 0;
  SPCompCount:number = 0;


  INCCount:number = 0;
  INCDraftsCount:number = 0;
  INCCanceledCount:number = 0;
  INCExecCount:number = 0;
  INCCompCount:number = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['WP', 'WR', 'SD'];
  public pieChartData: SingleDataSet = [this.WPCount, this.WRCount, this.SDCount];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public lineChartData: ChartDataSets[] = [
    { data: [5,10], label: 'Planned' },
    { data: [2, 6], label: 'Unplanned'}
  ];
  public lineChartLabels: Label[] = ['1'];
  public lineChartOptions: any  = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private wrService: WorkRequestsService,private incService:IncidentServiceService,private spService:SwitchingPlanService,private sdService:SafetyDocumentService) { }
  

  ngOnInit(): void {
    this.incService.getDashboardData().subscribe(
      (data)=>{
        let incidentNumbers = data.split(';');
        this.INCCount = incidentNumbers[0];
        this.INCDraftsCount = incidentNumbers[1];
        this.INCCanceledCount = incidentNumbers[2];
        this.INCExecCount = incidentNumbers[3];
        this.INCCompCount = incidentNumbers[4];
        this.lineChartData =[
          { data: [incidentNumbers[5],incidentNumbers[5]*2], label: 'Planned' },
          { data: [incidentNumbers[6],incidentNumbers[6]*2], label: 'Unplanned'}
        ];
     },
     (err) =>{
       console.log(err);
     } );

     this.wrService.getDashboardData().subscribe(
      (data)=>{
        let wrNumbers = data.split(';');
        this.WPCount = wrNumbers[0];
        this.WPDraftsCount = wrNumbers[1];
        this.WPCanceledCount = wrNumbers[2];
        this.WPExecCount = wrNumbers[3];
        this.WPCompCount = wrNumbers[4];
     },
     (err) =>{
       console.log(err);
     }
     );

     this.spService.getDashboardData().subscribe(
      (data)=>{
        let spNumbers = data.split(';');
        this.SPCount = spNumbers[0];
        this.SPDraftsCount = spNumbers[1];
        this.SPCanceledCount = spNumbers[2];
        this.SPExecCount = spNumbers[3];
        this.SPCompCount = spNumbers[4];
     },
     (err) =>{
       console.log(err);
     }
     );

     this.sdService.getDashboardData().subscribe(
      (data)=>{
        let sdNumbers = data.split(';');
        this.SDCount = sdNumbers[0];
        this.SDDraftsCount = sdNumbers[1];
        this.SDCanceledCount = sdNumbers[2];
        this.SDExecCount = sdNumbers[3];
     },
     (err) =>{
       console.log(err);
     }
     );
  }
    
  }


