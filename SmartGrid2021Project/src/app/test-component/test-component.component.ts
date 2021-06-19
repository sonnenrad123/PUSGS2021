import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { WorkRequestsService } from '../services/work-request/work-requests.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  WRCount:number = 6;
  WRDraftsCount:number = 2;
  WRCanceledCount:number = 3;
  WRExecCount:number = 1;
  WRCompCount:number = 0;

  WPCount:number = 16;
  WPDraftsCount:number = 12;
  WPCanceledCount:number = 3;
  WPExecCount:number = 1;
  WPCompCount:number = 0;

  SDCount:number = 13;
  SDDraftsCount:number = 8;
  SDCanceledCount:number = 3;
  SDExecCount:number = 1;
  SDCompCount:number = 1;

  INCCount:number = 13;
  INCDraftsCount:number = 8;
  INCCanceledCount:number = 3;
  INCExecCount:number = 1;
  INCCompCount:number = 1;

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

  constructor(private wrService: WorkRequestsService) { }
  

  ngOnInit(): void {
    
    
  }

}
