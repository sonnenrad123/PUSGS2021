
import { DatePipe } from '@angular/common';
import { ProviderAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NominatimResponse } from 'src/app/models/nominatim-response/nominatim-response.model';
import { SelectIncidentDialogComponent } from 'src/app/select-incident-dialog/select-incident-dialog.component';
import { SelectTeamDialogComponent } from 'src/app/select-team-dialog/select-team-dialog.component';
import { SelectWorkreqDialogComponent } from 'src/app/select-workreq-dialog/select-workreq-dialog.component';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';
import { StateChange } from '../add-plan-state-change-history/add-plan-state-change-history.component';

export enum WorkType{
  Planned = 'Planned',
  Unplanned = 'Unplanned'
}

@Component({
  selector: 'app-add-plan-basic',
  templateUrl: './add-plan-basic.component.html',
  styleUrls: ['./add-plan-basic.component.css'],
  providers:[DatePipe],
})
export class AddPlanBasicComponent implements OnInit {

  basicInfoForm: FormGroup;
  workTypes = WorkType;

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;
  selectedWorkRequest:any;
  selectedIncident:any;
  selectedTeam: any;
  stateChanges:StateChange[]=[];

  constructor(private datePipe: DatePipe,private nominatimService: NominatimService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let userEmail = localStorage.getItem('user');
    this.basicInfoForm = new FormGroup({
      'customId' : new FormControl('SP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl(''),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl(''),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl(userEmail,[Validators.required]) ,
      'purpose' : new FormControl(''),
      'notes' : new FormControl(''),
      'company' : new FormControl('',[Validators.required]),
      'phoneNo' : new FormControl('',[Validators.required]),
      'dateTimeCreated' : new FormControl(new Date(),[Validators.required])
    });

    this.basicInfoForm.controls['createdBy'].setValue(localStorage.getItem('user'));
    let modifyMode = window.sessionStorage.getItem('modifyModeActivated');
    if(modifyMode==null){
      let firstState:StateChange = {state:'Draft',date:this.datePipe.transform(new Date()),autor:localStorage.getItem('user')}
      this.stateChanges.push(firstState);
      window.sessionStorage.setItem('switchingPlanStateForm',JSON.stringify(this.stateChanges));
    }
    else{
      let switchingPlan = JSON.parse(window.sessionStorage.getItem('ModifySWPObject'));
       this.basicInfoForm.controls['createdBy'].setValue(switchingPlan.createdBy);
      this.basicInfoForm.patchValue(switchingPlan);
      this.basicInfoForm.controls['warrantForWork'].setValue(switchingPlan.warrantForWork);
      window.sessionStorage.setItem('switchingPlanSelectedWorkRequest',JSON.stringify(switchingPlan.warrantForWork));
      console.log(this.basicInfoForm.controls['warrantForWork'].value);
     
    }


    let formValue = window.sessionStorage.getItem('basicInfoForm');
      if(formValue!=null){
      this.basicInfoForm.setValue(JSON.parse(formValue));
      }

      if(window.sessionStorage.getItem('switchingPlanStateForm') != null){
        let stateChanges = JSON.parse(window.sessionStorage.getItem('switchingPlanStateForm'));
        let lastState = stateChanges[stateChanges.length-1].state;
        if(lastState === "Approve" || lastState === "Deny"){
          this.basicInfoForm.controls['status'].setValue("Executing");
        }else if(lastState === "Cancel"){
          this.basicInfoForm.controls['status'].setValue("Canceled");
        }else{
        this.basicInfoForm.controls['status'].setValue(lastState);
        }
        window.sessionStorage.setItem('basicInfoForm',JSON.stringify(this.basicInfoForm.value));
        //console.log(stateChanges);
      }

  }

  onClear(){
    let userEmail = localStorage.getItem('user');
    this.basicInfoForm = new FormGroup({
      'customId' : new FormControl('SP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl(''),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl(''),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl(userEmail,[Validators.required]) ,
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
  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }
  getAddress(result: NominatimResponse){
    this.basicInfoForm.controls['street'].setValue(result.displayName);
  }
  validateAddress(address:any){
    let found = false;
    this.searchResults.forEach(result => {
      if(result.displayName == address){
        found = true;
      }
    });
    if(found == false){
      this.addressInvalid = true;
      return;
    }
    this.addressInvalid = false;
  }

  ChooseWorkRequest(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1200px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(SelectWorkreqDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        window.sessionStorage.setItem('switchingPlanSelectedWorkRequest',JSON.stringify(data));
        this.selectedWorkRequest = data;
        this.basicInfoForm.controls['warrantForWork'].setValue(this.selectedWorkRequest.customId);
        this.basicInfoForm.controls['incident'].setValue(this.selectedWorkRequest.incident.customId);
        this.basicInfoForm.controls['street'].setValue(this.selectedWorkRequest.street);
        this.basicInfoForm.controls['startDateTime'].setValue(this.selectedWorkRequest.startDateTime);
        this.basicInfoForm.controls['endDateTime'].setValue(this.selectedWorkRequest.endDateTime);
        this.basicInfoForm.controls['purpose'].setValue(this.selectedWorkRequest.purpose);
        this.basicInfoForm.controls['notes'].setValue(this.selectedWorkRequest.notes);
        this.basicInfoForm.controls['company'].setValue(this.selectedWorkRequest.company);
        this.basicInfoForm.controls['phoneNo'].setValue(this.selectedWorkRequest.phoneNo);
      }
      
    );
  }

  ChooseIncident(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1200px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(SelectIncidentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        window.sessionStorage.setItem('switchingPlanSelectedIncident',JSON.stringify(data));
        this.selectedIncident = data;
        this.basicInfoForm.controls['incident'].setValue(this.selectedIncident.id);
      }
      
    );
  }

  ChooseTeam(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1200px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(SelectTeamDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        window.sessionStorage.setItem('switchingPlanSelectedTeam',JSON.stringify(data));
        this.selectedTeam = data;
        this.basicInfoForm.controls['team'].setValue(this.selectedTeam);
      }
      
    );
  }





}
