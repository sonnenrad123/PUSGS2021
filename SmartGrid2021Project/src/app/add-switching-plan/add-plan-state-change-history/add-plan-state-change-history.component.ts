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
  switchingPlanStates: any = ['Approve','Deny','Cancel'];
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

    if(window.sessionStorage.getItem('switchingPlanStateForm') != null){
      this.stateChanges = JSON.parse(window.sessionStorage.getItem('switchingPlanStateForm'));
    }
  }

  /*readData(){
    this.SwitchingPlanService.getSwitchingPlans().subscribe(
      switchingPlans => {
        this.responseData = switchingPlans.filter(x=> x.StateChanges);
        console.log(switchingPlans);
        this.mapData();
      },
      error => {
        console.log(error);
      }
    );
  }

  mapData(){
    var ss = JSON.stringify(this.responseData);
    
    this.stateChanges = JSON.parse(ss).map(item => ({
      id : item.id,
      state: item.state,
      date: item.date,
      autor: item.autor
    }));
  }*/

  onSubmit() {
    console.log(this.changeStateForm.value);
    let userEmail = localStorage.getItem('user');
    this.stateChanges.push({state:this.changeStateForm.get('switchingPlanState').value,date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:userEmail});
    window.sessionStorage.setItem('switchingPlanStateForm',JSON.stringify(this.stateChanges));
  }

}
