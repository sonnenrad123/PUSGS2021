import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-safety-document-basic-info',
  templateUrl: './safety-document-basic-info.component.html',
  styleUrls: ['./safety-document-basic-info.component.css'],
  providers: [DatePipe]
})
export class SafetyDocumentBasicInfoComponent implements OnInit {
  Types: any = ['Planned Work','Unplanned Work'];
  safetyDocTypes: any = ['Clearance','Clearance2'];
  basicInformationForm: FormGroup;
  myDate = "";
  constructor(private datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm');
  }

  ngOnInit(): void {
    this.basicInformationForm = new FormGroup({
      'type':new FormControl('Planned Work',[Validators.required]),
      'phoneNo':new FormControl('',[Validators.required]),
      'switchingPlan':new FormControl('ImplementPlanChoose',[Validators.required]),
      'safetyDocType': new FormControl('Clearance',[Validators.required]),
      'dateTimeCreated':new FormControl(this.myDate,[Validators.required]),
      'createdBy': new FormControl('TODO',[Validators.required]),
      'details': new FormControl(''),
      'notes':new FormControl(''),
    });


    let formValue = window.sessionStorage.getItem('AddSafetyDocumentBasicInformationForm');
    if(formValue!=null){
      this.basicInformationForm.setValue(JSON.parse(formValue));
    }
  }


  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'type':new FormControl('Planned Work',[Validators.required]),
      'phoneNo':new FormControl('',[Validators.required]),
      'switchingPlan':new FormControl('ImplementPlanChoose',[Validators.required]),
      'safetyDocType': new FormControl('Clearance',[Validators.required]),
      'dateTimeCreated':new FormControl(this.myDate,[Validators.required]),
      'createdBy': new FormControl('TODO',[Validators.required]),
      
      'details': new FormControl(''),
      'notes':new FormControl(''),
    });
    window.sessionStorage.removeItem('AddSafetyDocumentBasicInformationForm');
  }

  onSubmit() {
    window.sessionStorage.setItem('AddSafetyDocumentBasicInformationForm',JSON.stringify(this.basicInformationForm.value));

  }

}
