import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CallService } from 'src/app/services/call/call.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectCallerDialogComponent } from '../add-incident/incident-calls/incident-calls-new-call/select-caller-dialog/select-caller-dialog.component';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import { NominatimService } from '../services/nominatim/nominatim.service';

export interface Call{
  callId:string;
  reason:string;
  hazard:string;
  comment:string;
}

@Component({
  selector: 'app-report-outage-dialog',
  templateUrl: './report-outage-dialog.component.html',
  styleUrls: ['./report-outage-dialog.component.css']
})
export class ReportOutageDialogComponent implements OnInit {

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;
  callMail : string = "";

  addNewCallForm: FormGroup;
  callReasons: any = ['No power','There is breakdown','Flickering lights','Power on again','Partial power supply','Problems with voltage'];
  constructor(private nominatimService: NominatimService,private CallService:CallService,private _snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {
    
    let creatorEmail = localStorage.getItem('user');
    if(creatorEmail != null){
      this.callMail = creatorEmail;
    }

    this.addNewCallForm = new FormGroup({
      'reason': new FormControl('No power',Validators.required),
      'comment': new FormControl(''),
      'hazard': new FormControl('',Validators.required),
      'address': new FormControl('', Validators.required),
      'callerEmail': new FormControl(this.callMail),
    });
    
  }
  onSubmit(){
    this.CallService.addCall(this.addNewCallForm.value).subscribe(
      response =>{
        console.log(response);
        
      },
      error => {
        console.log(error);
      }
    );
    this.dialog.closeAll();
    this._snackBar.open('Outage reported.', 'Ok.');
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
    this.addNewCallForm.controls['address'].setValue(result.displayName);
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

  onClear(){
    this.dialog.closeAll();
  }

}
