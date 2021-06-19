import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { StreetPriorityService } from 'src/app/services/street-priority/street-priority.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

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
  incidentStatuses:string[] = ['Draft'];
  incidentPriority:any = 0;
  affectedCustomers:any = 0;
  constructor(private streetPriorityService:StreetPriorityService,private userService:UserAccountService) { }
  modifyMode:boolean = false;
  ngOnInit(): void {
    this.basicInformationForm = new FormGroup({
      'customId': new FormControl('INC'),
      'affectedCustomers': new FormControl(0),
      'incidentType':new FormControl('Planned',[Validators.required]),
      'outageTime':new FormControl(null,[Validators.required]),
      'priority':new FormControl(0),
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
      this.basicInformationForm.patchValue(JSON.parse(formValue));
    }
    
    this.basicInformationForm.controls['priority'].setValue(this.incidentPriority);
    this.basicInformationForm.controls['affectedCustomers'].setValue(this.affectedCustomers);


    let incidentSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
    if(incidentSelectedDevicestemp != null){
      incidentSelectedDevicestemp.forEach(device => {
        this.streetPriorityService.getStreetPriority(device.address).subscribe(
          response =>{
            //console.log(response);
            if(this.incidentPriority < response.priority){
              this.incidentPriority = response.priority;
              this.basicInformationForm.controls['priority'].setValue(this.incidentPriority);
            }
          },
          error => {
            console.log(error);
          }
        );

        this.userService.GetUsersCountWithAddress(device.address).subscribe(
          response =>{
            //console.log(response);
            if(response!=null){
              this.affectedCustomers= this.affectedCustomers + response;
              this.basicInformationForm.controls['affectedCustomers'].setValue(this.affectedCustomers);
            }
          },
          error => {
            console.log(error);
          }
        );


      });
      
    }
    let mm = window.sessionStorage.getItem('modifyModeActivated');
    if(mm!= null){
      this.modifyMode = JSON.parse(mm);
      if(this.modifyMode){
        this.incidentStatuses = ['Draft','Subbmited','Rejected','Accepted'];
      }
      
    }
    
  }
  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'customId': new FormControl(),
      'affectedCustomers': new FormControl(0),
      'incidentType':new FormControl('Planned',Validators.required),
      'outageTime':new FormControl(null,Validators.required),
      'priority':new FormControl(0),
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
