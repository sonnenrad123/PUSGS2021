import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface StateChange{
  state:string;
  date:string;
  autor:string;
}

@Component({
  selector: 'app-add-plan-state-change-history',
  templateUrl: './add-plan-state-change-history.component.html',
  styleUrls: ['./add-plan-state-change-history.component.css'],
  providers: [DatePipe]
})
export class AddPlanStateChangeHistoryComponent implements OnInit {

  tableData1!:any;
  changeStateForm:FormGroup;
  stateChanges:StateChange[]=[
    {state:"Approve",date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"},
    {state:"Deny",date:this.datePipe.transform(new Date("2021-05-26"),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"},
    {state:"Cancel",date:this.datePipe.transform(new Date("2021-05-28"),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"}
  ]
  switchingPlanStates: any = ['Approve','Deny','Cancel'];

  constructor(private datePipe: DatePipe) { 
   
  }

  ngOnInit(): void {
    this.changeStateForm = new FormGroup({
      'switchingPlanState':new FormControl('',[Validators.required]),
      
    });


    this.tableData1 = {
      headerRow: [ 'Date','State','Changed By']
  };
  }

  onSubmit() {
    console.log(this.changeStateForm.value);
    this.stateChanges.push({state:this.changeStateForm.get('switchingPlanState').value,date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:"Ivan Gajic (TODO)"});
    window.sessionStorage.setItem('AddPlanStateChangeHistoryForm',JSON.stringify(this.switchingPlanStates.value));
    
  }

}
