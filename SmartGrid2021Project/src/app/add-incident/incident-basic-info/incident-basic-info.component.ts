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
      'id': new FormControl(-1),
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

    let formValue = window.sessionStorage.getItem('basicInformationForm');
    if(formValue!=null){
      this.basicInformationForm.setValue(JSON.parse(formValue));
    }

  }
  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'id': new FormControl(-1),
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
    window.sessionStorage.removeItem('basicInformationForm');
  }
  onSubmit() {
    window.sessionStorage.setItem('basicInformationForm',JSON.stringify(this.basicInformationForm.value));

  }
}
