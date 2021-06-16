import { formatDate } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
      //typeOfWork: new FormControl(''),
      company: new FormControl('', Validators.required),
      startDateTime: new FormControl('', Validators.required),
      endDateTime: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required),
      purpose: new FormControl('', Validators.required),
      details: new FormControl(''),
      notes: new FormControl(''),
      phoneNo: new FormControl('', Validators.required),
      dateTimeCreated: new FormControl(this.currentDate.toISOString().split("T")[0]),
      street: new FormControl('', Validators.required)
    });
    this.basicInfoForm.controls['createdBy'].setValue(this.user);
    
    if(window.sessionStorage.getItem('WRBICurrValue') !== null){
      this.basicInfoForm.patchValue(JSON.parse(window.sessionStorage.getItem('WRBICurrValue')));
    }

  }
  Cancel(){
    this.router.navigate(['WorkRequests']);
  }
  SaveWRBasicInfo(){
    window.sessionStorage.removeItem('WRBICurrValue');
    window.sessionStorage.setItem('WRBICurrValue', JSON.stringify(this.basicInfoForm.value));
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
  getErrorMessagePurpose(){
    const field = this.basicInfoForm.get('purpose');
    if(field !== null){
      if(field.hasError('required')){
        return 'The purpose field is required';
      }
    }
    return '';
  }
    get startDate(): AbstractControl {
    return this.basicInfoForm.controls['startDateTime'];
    }
    get endDate() :AbstractControl{
      return this.basicInfoForm.controls['endDateTime'];
    }
    onDateChanged(){
    if (formatDate(this.startDate.value, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) {
      this.startDate.setErrors(null);
    } else {
      this.startDate.setErrors({ dateViolation: true });
    }
  }
  onEndDateChanged(){
    if (formatDate(this.endDate.value, 'yyyy-MM-dd', 'en_US') >= formatDate(this.startDate.value, 'yyyy-MM-dd', 'en_US')) {
      this.endDate.setErrors(null);
    } else {
      this.endDate.setErrors({ dateViolation: true });
    }
  }
  getErrorMessageStartDateTime(){
    const field = this.basicInfoForm.get('startDateTime');
    if(field !== null){
      if(field.hasError('required')){
        return 'The StartDate field is required';
      }
      if(field.hasError('dateViolation')){
        return 'The StartDate can not be in past!';
      }
    }
    return '';
  }
  getErrorMessageEndDateTime(){
    const field = this.basicInfoForm.get('endDateTime');
    if(field !== null){
      if(field.hasError('required')){
        return 'The EndDate field is required';
      }
      if(field.hasError('dateViolation')){
        return 'The EndDate can not before StartDate!';
      }
    }
    return '';
  }
  
}
