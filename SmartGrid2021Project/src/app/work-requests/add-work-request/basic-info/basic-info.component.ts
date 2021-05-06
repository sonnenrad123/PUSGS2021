import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})

export class BasicInfoComponent implements OnInit {
  basicInfoForm : FormGroup;
  user: string;
  currentDate: Date = new Date();

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    
    this.basicInfoForm = new FormGroup({
      typeOfDocument: new FormControl(),
      statusOfDocument: new FormControl('Draft'),
      incident: new FormControl(),
      emergencyWork: new FormControl(),
      typeOfWork: new FormControl(),
      company: new FormControl(),
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
  }
  Cancel(){
    this.router.navigate(['WorkRequests']);
  }

  

  
}
