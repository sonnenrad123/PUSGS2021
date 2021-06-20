import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentServiceService } from 'src/app/services/incident/incident-service.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-available-incidents-display',
  templateUrl: './available-incidents-display.component.html',
  styleUrls: ['./available-incidents-display.component.css']
})
export class AvailableIncidentsDisplayComponent implements OnInit {
  allIncidents: Array<any> = new Array<any>();
  currentValue: any;
  retVal: any;
  role: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private roleService: UserAccountService, private dialogRef: MatDialogRef<AvailableIncidentsDisplayComponent>, private incidentService: IncidentServiceService) { }

  ngOnInit(): void {
    this.role  = this.roleService.getRole();
    this.incidentService.getIncidents().subscribe(
      (data) => {
        //console.log(data);
        this.allIncidents = data;
        
      },
      (err) => {
        console.log(err);
      }
    );
    this.currentValue = this.data;
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
