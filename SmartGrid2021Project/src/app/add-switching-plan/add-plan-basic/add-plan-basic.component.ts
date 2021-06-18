import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum WorkType{
  Planned = 'Planned',
  Unplanned = 'Unplanned'
}

@Component({
  selector: 'app-add-plan-basic',
  templateUrl: './add-plan-basic.component.html',
  styleUrls: ['./add-plan-basic.component.css']
})
export class AddPlanBasicComponent implements OnInit {

  basicInfoForm: FormGroup;
  workTypes = WorkType;

  constructor() { }

  ngOnInit(): void {
    this.basicInfoForm = new FormGroup({
      'id' : new FormControl('SWP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl('', [Validators.required]),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl('',[Validators.required]),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl('Todo',[Validators.required]) ,
      'purpose' : new FormControl(''),
      'notes' : new FormControl(''),
      'company' : new FormControl('',[Validators.required]),
      'phoneNo' : new FormControl('',[Validators.required]),
      'dateTimeCreated' : new FormControl(new Date(),[Validators.required])
    });

    let formValue = window.sessionStorage.getItem('basicInfoForm');
      if(formValue!=null){
      this.basicInfoForm.setValue(JSON.parse(formValue));
      }

  }

  onClear(){
    this.basicInfoForm = new FormGroup({
      'id' : new FormControl('SWP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl('', [Validators.required]),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl('',[Validators.required]),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl('Todo',[Validators.required]) ,
      'purpose' : new FormControl(''),
      'notes' : new FormControl(''),
      'company' : new FormControl('',[Validators.required]),
      'phoneNo' : new FormControl('',[Validators.required]),
      'dateTimeCreated' : new FormControl(new Date(),[Validators.required])
    });

    window.sessionStorage.removeItem('basicInfoForm');
  }

  onSubmit() {
    window.sessionStorage.setItem('basicInfoForm',JSON.stringify(this.basicInfoForm.value));

  }

  WorkTypeKeys(): Array<string>{
    var keys = Object.keys(this.workTypes);
    return keys;
  }


}
