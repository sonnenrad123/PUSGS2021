import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {
  incidentTypes: any = ['Planned','Unplanned'];
  generatedId: string = "INCIDENT102030";
  basicInformationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.basicInformationForm = new FormGroup({
      'id': new FormControl(this.generatedId),
      'affectedCustomers': new FormControl(10),
      'incidentType':new FormControl('Planned',[Validators.required]),
      'outageTime':new FormControl(null,[Validators.required]),
      'priority':new FormControl(5),
      'etr':new FormControl(null,[Validators.required]),
      'confirmed':new FormControl(),
      'calls':new FormControl(null,[Validators.required,Validators.min(1)]),
      'voltage':new FormControl(null,[Validators.required,Validators.min(0.1)]),
      'incidentDesc':new FormControl(""),
      'eta':new FormControl(null,[Validators.required]),
      'scheduledTime':new FormControl(null,[Validators.required]),
      'ata':new FormControl(null,[Validators.required]),
      'status':new FormControl("Dispatched"),
      'dodeliSebi':new FormControl(null)
    });
  }
  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'id': new FormControl(this.generatedId),
      'affectedCustomers': new FormControl(10),
      'incidentType':new FormControl('Planned',Validators.required),
      'outageTime':new FormControl(null,Validators.required),
      'priority':new FormControl(5),
      'etr':new FormControl(null,Validators.required),
      'confirmed':new FormControl(),
      'calls':new FormControl(null,[Validators.required,Validators.min(1)]),
      'voltage':new FormControl(null,[Validators.required,Validators.min(0)]),
      'status':new FormControl("Dispatched"),
      'eta':new FormControl(null,Validators.required),
      'scheduledTime':new FormControl(null,Validators.required),
      'ata':new FormControl(null,Validators.required),
      'dodeliSebi':new FormControl(null),
      'incidentDesc':new FormControl(""),
    });
    
  }
  onSubmit() {
    console.log("ID "+this.basicInformationForm.value.id);
    console.log("Affected cust: "+this.basicInformationForm.value.affectedCustomers);
    
    console.log("Type "+this.basicInformationForm.value.incidentType);
    console.log("Outage time "+this.basicInformationForm.value.outageTime);
    console.log("Priority "+this.basicInformationForm.value.priority);
    console.log("ETR "+this.basicInformationForm.value.etr);
    console.log("Confirmed "+this.basicInformationForm.value.confirmed);
    console.log("Calls "+this.basicInformationForm.value.calls);
    console.log("Voltage "+this.basicInformationForm.value.voltage);
    console.log("Incident desc "+this.basicInformationForm.value.incidentDesc);
    console.log("ETA "+this.basicInformationForm.value.eta);
    console.log("scheduledTime "+this.basicInformationForm.value.scheduledTime);
    console.log("ATA "+this.basicInformationForm.value.ata);
    console.log("I will solve "+this.basicInformationForm.value.dodeliSebi);
    console.log("Status "+this.basicInformationForm.value.status);
  }
}
