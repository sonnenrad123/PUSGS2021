import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-safety-document-checklist',
  templateUrl: './safety-document-checklist.component.html',
  styleUrls: ['./safety-document-checklist.component.css']
})
export class SafetyDocumentChecklistComponent implements OnInit {
  checklistForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.checklistForm = new FormGroup({
      'workCompleted':new FormControl(false),
      'tagsRemoved':new FormControl(false),
      'groundingRemoved':new FormControl(false),
      'readyForService':new FormControl(false),
    });
    let modifyMode = window.sessionStorage.getItem('safetyDocModifyMode');
    if(modifyMode!=null){
      let safetyDocument = JSON.parse(window.sessionStorage.getItem('ModifySafetyDocumentObject'));
      this.checklistForm.patchValue(safetyDocument);
      let formValue = window.sessionStorage.getItem('AddSafetyDocumentChecklist');
      if(formValue!=null){
        this.checklistForm.setValue(JSON.parse(formValue));
      }
    }
    else{
      let formValue = window.sessionStorage.getItem('AddSafetyDocumentChecklist');
      if(formValue!=null){
        this.checklistForm.setValue(JSON.parse(formValue));
      }
    }
    

  }


  onSubmit() {
    console.log(this.checklistForm.value);
    window.sessionStorage.setItem('AddSafetyDocumentChecklist',JSON.stringify(this.checklistForm.value));
  }
}
