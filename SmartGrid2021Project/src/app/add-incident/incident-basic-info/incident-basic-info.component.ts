import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

export enum IncidentType{
  Planned = 'Planned',
  Unplanned = 'Unplanned'
}

@Component({
  selector: 'app-incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {
  generatedId: string = "INCIDENT102030";
  basicInformationForm: FormGroup;
  incidentTypes = IncidentType;

  constructor() { }

  ngOnInit(): void {
    this.basicInformationForm = new FormGroup({
      'idCustom': new FormControl('INC'),
      'affectedCustomers': new FormControl(10),
      'incidentType':new FormControl('Planned',[Validators.required]),
      'outageTime':new FormControl(null,[Validators.required]),
      'priority':new FormControl(5),
      'etr':new FormControl(null,[Validators.required]),
      'confirmed':new FormControl(false),
      'calls':new FormControl(null,[Validators.required,Validators.min(1)]),
      'voltage':new FormControl(null,[Validators.required,Validators.min(0.1)]),
      'incidentDesc':new FormControl(""),
      'eta':new FormControl(null,[Validators.required]),
      'scheduledTime':new FormControl(null,[Validators.required]),
      'ata':new FormControl(null,[Validators.required]),
      'status':new FormControl("Draft"),
      'dodeliSebi':new FormControl(true),
      'phoneNo':new FormControl("",Validators.required)
    });

    let formValue = window.sessionStorage.getItem('basicInformationForm');
    if(formValue!=null){
      this.basicInformationForm.setValue(JSON.parse(formValue));
    }

  }
  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'idCustom': new FormControl(),
      'affectedCustomers': new FormControl(10),
      'incidentType':new FormControl('Planned',Validators.required),
      'outageTime':new FormControl(null,Validators.required),
      'priority':new FormControl(5),
      'etr':new FormControl(null,Validators.required),
      'confirmed':new FormControl(),
      'calls':new FormControl(null,[Validators.required,Validators.min(1)]),
      'voltage':new FormControl(null,[Validators.required,Validators.min(0)]),
      'status':new FormControl("Draft"),
      'eta':new FormControl(null,Validators.required),
      'scheduledTime':new FormControl(null,Validators.required),
      'ata':new FormControl(null,Validators.required),
      'dodeliSebi':new FormControl(true),
      'incidentDesc':new FormControl(""),
      'phoneNo':new FormControl("",Validators.required)
    });
    window.sessionStorage.removeItem('basicInformationForm');
  }
  onSubmit() {
    window.sessionStorage.setItem('basicInformationForm',JSON.stringify(this.basicInformationForm.value));

  }

  IncidentTypeKeys(): Array<string>{
    var keys = Object.keys(this.incidentTypes);
    return keys;
  }
}
