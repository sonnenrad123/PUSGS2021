import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})

export class BasicInfoComponent implements OnInit {
  basicInfoForm : FormGroup;
  user: string ;
  currentDate: Date = new Date();

  constructor(private router: Router, private workReqService: WorkRequestsService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    
    this.basicInfoForm = new FormGroup({
      typeOfDocument: new FormControl('', Validators.required),
      statusOfDocument: new FormControl('Draft'),
      incident: new FormControl(''),
      emergencyWork: new FormControl(''),
      typeOfWork: new FormControl(''),
      company: new FormControl('', Validators.required),
      startDateTime: new FormControl(),
      endDateTime: new FormControl(),
      createdBy: new FormControl(),
      purpose: new FormControl(''),
      details: new FormControl(''),
      notes: new FormControl(''),
      phoneNo: new FormControl('', Validators.required),
      dateTimeCreated: new FormControl(this.currentDate.toISOString().split("T")[0]),
      street: new FormControl('', Validators.required)
    });
    
    this.basicInfoForm.controls['createdBy'].setValue(this.user);

  }
  Cancel(){
    this.router.navigate(['WorkRequests']);
  }
  SaveWRBasicInfo(){
    if(this.basicInfoForm.controls['emergencyWork'].value === null){
      this.basicInfoForm.controls['emergencyWork'].setValue(false);
    }
      this.workReqService.SaveWorkInfo(this.basicInfoForm.value);
  }
  
  getErrorMessageTypeOfDoc(){
    const field = this.basicInfoForm.get('typeOfDocument');
    if(field !== null){
      if(field.hasError('required')){
        return 'The type of document field is required';
      }
    }
    return '';
  }
  
  getErrorMessageCompany(){
    const field = this.basicInfoForm.get('company');
    if(field !== null){
      if(field.hasError('required')){
        return 'The company field is required';
      }
    }
    return '';
  }
  
  getErrorMessageAddress(){
    const field = this.basicInfoForm.get('street');
    if(field !== null){
      if(field.hasError('required')){
        return 'The address field is required';
      }
    }
    return '';
  }

  getErrorMessagePhoneNo(){
    const field = this.basicInfoForm.get('phoneNo');
    if(field !== null){
      if(field.hasError('required')){
        return 'The phoneNo field is required';
      }
    }
    return '';
  }
  
}
