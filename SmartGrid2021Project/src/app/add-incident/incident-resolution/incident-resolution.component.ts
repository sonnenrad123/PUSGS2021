import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      'subcause': new FormControl('Lighting'),
      'constructionType': new FormControl('None'),
      'material': new FormControl('Unknown')
    });
  }

  onClear(){
    this.resolutionForm = new FormGroup({
      'cause': new FormControl('Weather'),
      'subcause': new FormControl('Lighting'),
      'constructionType': new FormControl('None'),
      'material': new FormControl('Unknown')
    });
  }

  onSubmit(){
    console.log("Cause: "+this.resolutionForm.value.cause);
    console.log("Subcause: "+this.resolutionForm.value.subcause);
    console.log("contructionType "+this.resolutionForm.value.constructionType);
    console.log("Material "+this.resolutionForm.value.material);
  }
  onChange(option:string){
    switch(option){
      case 'Weather':
        this.subcauseTypes = ['Lighting','Hurricane','Heavy rain'];
        break;
      case 'HumanFactor':
        this.subcauseTypes = ['Car crash', 'Destroying equipment', 'Bad usage'];
        break;
      case 'EquipmentHazard':
        this.subcauseTypes = ['PrimaryEquipmentMalfunction','SecondaryEquipmentMalfunction','SoftwareMalfunction','HardwareMalfunction'];
        break;
    }
  }
      
  
}
