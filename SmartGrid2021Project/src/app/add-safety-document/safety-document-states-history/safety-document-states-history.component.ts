import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface StateChange{
  state:string;
  date:string;
  autor:string;
}

@Component({
  selector: 'app-safety-document-states-history',
  templateUrl: './safety-document-states-history.component.html',
  styleUrls: ['./safety-document-states-history.component.css'],
  providers: [DatePipe]
})
export class SafetyDocumentStatesHistoryComponent implements OnInit {
  tableData1!:any;
  changeStateForm:FormGroup;
  stateChanges:StateChange[]=[
    {state:"Draft",date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"},
    {state:"Issue",date:this.datePipe.transform(new Date("2021-05-26"),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"},
    {state:"Cancel",date:this.datePipe.transform(new Date("2021-05-28"),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"}
  ]
  safetyDocumentStates: any = ['Draft','Issue','Cancel'];

  constructor(private datePipe: DatePipe) { 
   
  }

  ngOnInit(): void {
    this.changeStateForm = new FormGroup({
      'safetyDocumentState':new FormControl('',[Validators.required]),
      
    });


    this.tableData1 = {
      headerRow: [ 'Date','State','Changed By']
  };
  }

  onSubmit() {
    console.log(this.changeStateForm.value);
    this.stateChanges.push({state:this.changeStateForm.get('safetyDocumentState').value,date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"});
    window.sessionStorage.setItem('AddSafetyDocumentChangeStateForm',JSON.stringify(this.safetyDocumentStates.value));
    
  }
}
