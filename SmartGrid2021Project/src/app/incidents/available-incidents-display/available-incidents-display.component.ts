import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IncidentServiceService } from 'src/app/services/incident/incident-service.service';

@Component({
  selector: 'app-available-incidents-display',
  templateUrl: './available-incidents-display.component.html',
  styleUrls: ['./available-incidents-display.component.css']
})
export class AvailableIncidentsDisplayComponent implements OnInit {
  allIncidents: Array<any> = new Array<any>();
  currentValue: any;
  retVal: any;
  constructor(private dialogRef: MatDialogRef<AvailableIncidentsDisplayComponent>, private incidentService: IncidentServiceService) { }

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe(
      (data) => {
        //console.log(data);
        this.allIncidents = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  UpdateSelected(){
    console.log();
  }
  Save(){
    this.dialogRef.close(this.retVal);
  }

  Close(){
      this.dialogRef.close();
  }

  onChange = (value) => {
    this.currentValue = value.id;
    this.retVal = value;
  }
}