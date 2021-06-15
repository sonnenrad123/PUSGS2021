import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NominatimResponse } from 'src/app/models/nominatim-response/nominatim-response.model';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';
import {CallService} from '../../../services/call/call.service'
import {SelectCallerDialogComponent} from '../incident-calls-new-call/select-caller-dialog/select-caller-dialog.component';
export interface Call{
  reason:string;
  comment:string;
  hazard:string;
  address:string;
  callerEmail:string;
}

@Component({
  selector: 'app-incident-calls-new-call',
  templateUrl: './incident-calls-new-call.component.html',
  styleUrls: ['./incident-calls-new-call.component.css']
})
export class IncidentCallsNewCallComponent implements OnInit {

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;

  addNewCallForm: FormGroup;
  anonymous: boolean = false;
  callerName: string = "Please select customer";
  callerID: string = "Please select customer";
  callerAddress: string = "Please select customer";
  callReasons: any = ['No power','There is breakdown','Flickering lights','Power on again','Partial power supply','Problems with voltage'];
  constructor(private nominatimService: NominatimService,private CallService:CallService,private _snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.addNewCallForm = new FormGroup({
      'reason': new FormControl('No power',Validators.required),
      'comment': new FormControl(''),
      'hazard': new FormControl('',Validators.required),
      'address': new FormControl('', Validators.required),
      'callerEmail': new FormControl(''),
      'anonymousCheck': new FormControl(false)
    });
    
  }
  onSubmit(){
    this.CallService.addCall(this.addNewCallForm.value).subscribe(
      response =>{
        console.log(response);
        this._snackBar.open('Call added!','Ok');
      },
      error => {
        console.log(error);
      }
    );
  }
  toggleAnonymous(){
    this.anonymous = this.addNewCallForm.get('anonymousCheck').value;
    if(this.anonymous){
      this.addNewCallForm.controls["address"].setValue("");
      this.addNewCallForm.controls["callerEmail"].setValue("");
      this.callerID = "Please select customer";
      this.callerName = "Please select customer";
      this.callerAddress= "Please select customer";
    }
    else{
      this.addNewCallForm.controls["address"].setValue("");
      this.addNewCallForm.controls["callerEmail"].setValue("");
      this.callerID = "Please select customer";
      this.callerName = "Please select customer";
      this.callerAddress = "Please select customer";
    }
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



  selectCustomer(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '800px';
    const dialogRef = this.dialog.open(SelectCallerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {console.log("Dialog output:", data);
        this.callerAddress= data.address;
        this.callerID = data.userName;
        this.callerName = data.firstName + " " + data.lastName;
        this.addNewCallForm.controls["address"].setValue(this.callerAddress);
        this.addNewCallForm.controls["callerEmail"].setValue(data.email);
        this.addressInvalid = false;
        }
        
        
        
    );

    
  }
  onClear(){
    this.addNewCallForm = new FormGroup({
      'reason': new FormControl('No power',Validators.required),
      'comment': new FormControl(''),
      'hazard': new FormControl('',Validators.required),
      'address': new FormControl('', Validators.required),
      'anonymousCheck': new FormControl(false)
    });
    this.callerID = "Please select customer";
    this.callerName = "Please select customer";
    this.callerAddress= "Please select customer";
  }

  

  
}
