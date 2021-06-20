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
  stateChanges:StateChange[]=[];
  safetyDocumentStates: any = [];

  constructor(private datePipe: DatePipe) { 
   
  }

  ngOnInit(): void {
    this.changeStateForm = new FormGroup({
      'safetyDocumentState':new FormControl('',[Validators.required]),
      
    });
    this.tableData1 = {
      headerRow: [ 'Date','State','Changed By']
    };
    let modifyMode = window.sessionStorage.getItem('safetyDocModifyMode');
    if(modifyMode!=null){
      this.safetyDocumentStates = ['Draft','Issue','Cancel'];
      if(window.sessionStorage.getItem('AddSafetyDocumentChangeStateHistory') != null){
        this.stateChanges = JSON.parse(window.sessionStorage.getItem('AddSafetyDocumentChangeStateHistory'));
      }
    }
    else{
      let firstState:StateChange = {state:'Draft',date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:localStorage.getItem('user')}
      this.stateChanges.push(firstState);


    }

    this.tableData1 = {
      headerRow: [ 'Date','State','Changed By']
  };
  }

  onSubmit() {
    console.log(this.changeStateForm.value);
    this.stateChanges.push({state:this.changeStateForm.get('safetyDocumentState').value,date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:localStorage.getItem('user')});
    window.sessionStorage.setItem('AddSafetyDocumentChangeStateHistory',JSON.stringify(this.stateChanges));
    
  }
  
}
