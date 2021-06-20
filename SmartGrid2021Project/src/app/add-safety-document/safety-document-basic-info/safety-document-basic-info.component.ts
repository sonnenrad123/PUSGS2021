import { FnParam } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatDialogConfig, MatDialog} from "@angular/material/dialog";
import { SelectSwitchingPlanModalDialogComponent } from 'src/app/select-switching-plan-modal-dialog/select-switching-plan-modal-dialog.component';
export interface StateChange{
  state:string;
  date:string;
  autor:string;
}



@Component({
  selector: 'app-safety-document-basic-info',
  templateUrl: './safety-document-basic-info.component.html',
  styleUrls: ['./safety-document-basic-info.component.css'],
  providers: [DatePipe]
})


export class SafetyDocumentBasicInfoComponent implements OnInit {
  stateChanges:StateChange[]=[];
  Types: any = ['Planned Work','Unplanned Work'];
  safetyDocTypes: any = ['Clearance','Delivery '];
  safetyDocStatuses:any[] = ['Draft'];
  basicInformationForm: FormGroup;
  fieldCrew:any = 'Please choose switching plan';
  myDate = "";
  selectedSwitchingPlan:any;
  modifyMode:boolean = false;
  constructor(private datePipe: DatePipe,private dialog: MatDialog,private cd: ChangeDetectorRef ) { 
    this.myDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm');
  }

  ngOnInit(): void {
    this.basicInformationForm = new FormGroup({
      'type':new FormControl('Planned Work',[Validators.required]),
      'status':new FormControl('Draft',[Validators.required]),
      'phoneNo':new FormControl('',[Validators.required]),
      'safetyDocType': new FormControl('Clearance',[Validators.required]),
      'dateTimeCreated':new FormControl(this.myDate,[Validators.required]),
      'createdBy': new FormControl('',[Validators.required]),
      'details': new FormControl(''),
      'notes':new FormControl(''),
      'fieldCrew': new FormControl('',Validators.required),
      'switchingPlanId':new FormControl('',Validators.required)
    });

    this.basicInformationForm.controls['createdBy'].setValue(localStorage.getItem('user'));
    let modifyMode = window.sessionStorage.getItem('safetyDocModifyMode');
    if(modifyMode==null){
      let firstState:StateChange = {state:'Draft',date:this.datePipe.transform(new Date(),'dd-MM-yyyy HH:mm'),autor:localStorage.getItem('user')}
      this.stateChanges.push(firstState);
      window.sessionStorage.setItem('AddSafetyDocumentChangeStateHistory',JSON.stringify(this.stateChanges));
    }
    else{
      let safetyDocument = JSON.parse(window.sessionStorage.getItem('ModifySafetyDocumentObject'));
       this.basicInformationForm.controls['createdBy'].setValue(safetyDocument.creator.email);

      
      this.basicInformationForm.patchValue(safetyDocument);
      this.basicInformationForm.controls['switchingPlanId'].setValue(safetyDocument.switchingPlan.customId);
      window.sessionStorage.setItem('safetyDocSelectedSwitchingPlan',JSON.stringify(safetyDocument.switchingPlan));
      console.log(this.basicInformationForm.controls['switchingPlanId'].value);
     
    }
   

    let formValue = window.sessionStorage.getItem('AddSafetyDocumentBasicInformationForm');
    if(formValue!=null){
      this.basicInformationForm.setValue(JSON.parse(formValue));
    }

    if(window.sessionStorage.getItem('AddSafetyDocumentChangeStateHistory') != null){
      let stateChanges = JSON.parse(window.sessionStorage.getItem('AddSafetyDocumentChangeStateHistory'));
      let lastState = stateChanges[stateChanges.length-1].state;
      this.basicInformationForm.controls['status'].setValue(lastState);
      window.sessionStorage.setItem('AddSafetyDocumentBasicInformationForm',JSON.stringify(this.basicInformationForm.value));
      //console.log(stateChanges);
    }

    
  }


  onClear() {
    
    this.basicInformationForm = new FormGroup({
      'type':new FormControl('Planned Work',[Validators.required]),
      'phoneNo':new FormControl('',[Validators.required]),
      'safetyDocType': new FormControl('Clearance',[Validators.required]),
      'dateTimeCreated':new FormControl(this.myDate,[Validators.required]),
      'createdBy': new FormControl('TODO',[Validators.required]),
      'status':new FormControl('Draft',[Validators.required]),
      'details': new FormControl(''),
      'notes':new FormControl(''),
      'fieldCrew': new FormControl('',Validators.required),
      'switchingPlanId':new FormControl('',Validators.required)
    });
    window.sessionStorage.removeItem('AddSafetyDocumentBasicInformationForm');
  }
  ChooseSwitchingPlan(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '800px';
    const dialogRef = this.dialog.open(SelectSwitchingPlanModalDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        window.sessionStorage.setItem('safetyDocSelectedSwitchingPlan',JSON.stringify(data));
        this.selectedSwitchingPlan = data;
        this.basicInformationForm.controls['fieldCrew'].setValue(this.selectedSwitchingPlan.team);
        this.basicInformationForm.controls['switchingPlanId'].setValue(this.selectedSwitchingPlan.id);
      }
      
    );
  }


  onSubmit() {
    window.sessionStorage.setItem('AddSafetyDocumentBasicInformationForm',JSON.stringify(this.basicInformationForm.value));

  }
  
  
}
