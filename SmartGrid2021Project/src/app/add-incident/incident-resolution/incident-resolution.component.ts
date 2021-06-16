import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident-resolution',
  templateUrl: './incident-resolution.component.html',
  styleUrls: ['./incident-resolution.component.css']
})
export class IncidentResolutionComponent implements OnInit {
  resolutionForm: FormGroup;
  causeTypes: any = ['Weather','HumanFactor','EquipmentHazard'];
  subcauseTypes: any = ['Lighting','Hurricane','Heavy rain'];
  constructionTypes: any = ['None','Underground','Overground'];
  materialTypes: any = ['Unknown','Metal','Plastic','Rubber'];
  constructor() { }

  ngOnInit(): void {
    this.resolutionForm = new FormGroup({
      'cause': new FormControl('Weather'),
      'subcause': new FormControl('Lighting',[Validators.required]),
      'constructionType': new FormControl('None'),
      'material': new FormControl('Unknown')
    });
    let formValue = window.sessionStorage.getItem('resolutionForm');
    
    if(formValue!=null){
      this.onChange(JSON.parse(formValue)['cause']);
      this.resolutionForm.setValue(JSON.parse(formValue));
      
    }

    let  modifyModeActivated = window.sessionStorage.getItem('modifyModeActivated');
    if(modifyModeActivated){
      let incidentObject = JSON.parse(window.sessionStorage.getItem('ModifyIncidentObject'));
      this.onChange(incidentObject.cause);
      this.resolutionForm.patchValue(incidentObject);
      window.sessionStorage.setItem('resolutionForm',JSON.stringify(this.resolutionForm.value));
    }


  }

  onClear(){
    this.resolutionForm = new FormGroup({
      'cause': new FormControl('Weather'),
      'subcause': new FormControl(),
      'constructionType': new FormControl('None'),
      'material': new FormControl('Unknown')
    });

    window.sessionStorage.removeItem('resolutionForm');
  }

  onSubmit(){
    window.sessionStorage.setItem('resolutionForm',JSON.stringify(this.resolutionForm.value));
  }
  onChange(option:string){
    switch(option){
      case 'Weather':
        this.subcauseTypes = ['Lighting','Hurricane','Heavy rain'];
        this.resolutionForm.controls['subcause'].setValue('Lighting');
        
        break;
      case 'HumanFactor':
        this.subcauseTypes = ['Car crash', 'Destroying equipment', 'Bad usage'];
        this.resolutionForm.controls['subcause'].setValue('Car crash');
        break;
      case 'EquipmentHazard':
        this.subcauseTypes = ['PrimaryEquipmentMalfunction','SecondaryEquipmentMalfunction','SoftwareMalfunction','HardwareMalfunction'];
        this.resolutionForm.controls['subcause'].setValue('PrimaryEquipmentMalfunction');
        break;
    }
  }
      
  
}
