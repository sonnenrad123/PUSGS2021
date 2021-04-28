import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident-calls-new-call',
  templateUrl: './incident-calls-new-call.component.html',
  styleUrls: ['./incident-calls-new-call.component.css']
})
export class IncidentCallsNewCallComponent implements OnInit {
  addNewCallForm: FormGroup;
  anonymous: boolean = false;
  callerName: string = "Please select customer";
  callerID: string = "Please select customer";
  callerStreetName: string = "Please select customer";
  callerStreetNumber: string = "Please select customer";
  callReasons: any = ['No power','There is breakdown','Flickering lights','Power on again','Partial power supply','Problems with voltage'];
  constructor() { }

  ngOnInit(): void {
    
    this.addNewCallForm = new FormGroup({
      'reason': new FormControl('No power',Validators.required),
      'comment': new FormControl(''),
      'hazard': new FormControl('',Validators.required),
      'streetName': new FormControl('', Validators.required),
      'streetNumber': new FormControl('',Validators.required),
      'anonymousCheck': new FormControl(false)
    });
    
  }
  onSubmit(){
    console.log(this.addNewCallForm.value.reason);
    console.log(this.addNewCallForm.value.comment);
    console.log(this.addNewCallForm.value.hazard);
    console.log(this.addNewCallForm.value.streetName);
    console.log(this.addNewCallForm.value.streetNumber);
  }
  toggleAnonymous(){
    this.anonymous = this.addNewCallForm.get('anonymousCheck').value;
    if(this.anonymous){
      this.addNewCallForm.controls["streetName"].setValue("");
      this.addNewCallForm.controls["streetNumber"].setValue("");
      this.callerID = "Please select customer";
      this.callerName = "Please select customer";
      this.callerStreetName = "Please select customer";
      this.callerStreetNumber = "Please select customer";
    }
    else{
      this.addNewCallForm.controls["streetName"].setValue("");
      this.addNewCallForm.controls["streetNumber"].setValue("");
      this.callerID = "Please select customer";
      this.callerName = "Please select customer";
      this.callerStreetName = "Please select customer";
      this.callerStreetNumber = "Please select customer";
    }
  }
  selectCustomer(){
    this.callerStreetNumber = "Zakucana vrednost. Implementirati prilikom izrade backenda";
    this.callerStreetName = "Zakucana vrednost. Implementirati prilikom izrade backenda";
    this.callerID = "131213";
    this.callerName = "Ivan Gajic";
    this.addNewCallForm.controls["streetName"].setValue(this.callerStreetName);
    this.addNewCallForm.controls["streetNumber"].setValue(this.callerStreetNumber);
  }
  onClear(){
    this.addNewCallForm = new FormGroup({
      'reason': new FormControl('No power',Validators.required),
      'comment': new FormControl(''),
      'hazard': new FormControl('',Validators.required),
      'streetName': new FormControl('', Validators.required),
      'streetNumber': new FormControl('',Validators.required),
      'anonymousCheck': new FormControl(false)
    });
    this.callerID = "Please select customer";
    this.callerName = "Please select customer";
    this.callerStreetName = "Please select customer";
    this.callerStreetNumber = "Please select customer";
  }
}
