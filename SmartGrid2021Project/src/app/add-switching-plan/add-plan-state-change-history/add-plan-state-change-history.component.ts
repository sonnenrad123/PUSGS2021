import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwitchingPlanService } from 'src/app/services/switching-plan/switching-plan.service';

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
  stateChanges:StateChange[]=[]
  switchingPlanStates: any = [];
  responseData: any[];

  constructor(private datePipe: DatePipe, private SwitchingPlanService: SwitchingPlanService) { 
   
  }

  ngOnInit(): void {
    this.changeStateForm = new FormGroup({
      'switchingPlanState':new FormControl('',[Validators.required])
    });

    this.tableData1 = {
      headerRow: [ 'Date','State','Changed By']
    };

    let modifyMode = window.sessionStorage.getItem('modifyModeActivated');
    if(modifyMode!=null){
      this.switchingPlanStates = ['Approve','Deny','Cancel'];
      if(window.sessionStorage.getItem('switchingPlanStateForm') != null){
        this.stateChanges = JSON.parse(window.sessionStorage.getItem('switchingPlanStateForm'));
      }
    }
    else{
      let firstState:StateChange = {state:'Draft',date:this.datePipe.transform(new Date()),autor:localStorage.getItem('user')}
      this.stateChanges.push(firstState);
    }
  }

  onSubmit() {
    console.log(this.changeStateForm.value);
    let userEmail = localStorage.getItem('user');
    this.stateChanges.push({state:this.changeStateForm.get('switchingPlanState').value,date:this.datePipe.transform(new Date()),autor:userEmail});
    window.sessionStorage.setItem('switchingPlanStateForm',JSON.stringify(this.stateChanges));
  }

}
