import { formatDate } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentBasicInfoComponent } from 'src/app/add-incident/incident-basic-info/incident-basic-info.component';
import { Device } from 'src/app/incident-devices-dialog/incident-devices-dialog.component';
import { AvailableIncidentsDisplayComponent } from 'src/app/incidents/available-incidents-display/available-incidents-display.component';
import { NominatimResponse } from 'src/app/models/nominatim-response/nominatim-response.model';
import { WorkRequest } from 'src/app/models/work-request/work-request';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})

export class BasicInfoComponent implements OnInit {
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;
  wrID : number;
  basicInfoForm : FormGroup;
  user: string ;
  currentDate: Date = new Date();
  currentIncId: any;
  constructor(private router: Router, 
              private workReqService: WorkRequestsService, 
              private nominatimService: NominatimService, 
              private dialog:MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.wrID = this.route.snapshot.queryParams['wr'];
    

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
    /*if(this.wrID){
      this.workReqService.get(this.wrID).subscribe(
        (data) => {
          console.log(data);
          
          let binfo = {
          typeOfDocument: data.typeOfDocument,
          statusOfDocument: data.statusOfDocument,
          incident: data.incident,
          emergencyWork: data.emergencyWork,
          company: data.company,
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime,
          createdBy: data.createdBy,
          purpose: data.purpose,
          details: data.details,
          notes: data.notes,
          phoneNo: data.phoneNo,
          dateTimeCreated: data.dateTimeCreated,
          street: data.street 
        };
          //this.basicInfoForm.patchValue(binfo);
          console.log('BI: '+binfo);
          let scs = {stateChangesHistory: [data.stateChangesHistory]};
          console.log('SCS: '+scs);
          let equ = new Array<Device>();
          data.equipment.forEach(_ => equ.push(_));
          console.log('EQU: '+equ);
          let att = {attachments : [data.attachments]};
          console.log('ATT: '+att);
        },
        (err) => {
          console.log(err);
        }
        );
    }*/
    
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
      if(field.hasError('formatViolation')){
        return 'Incorrect address format! Press ENTER for searching...';
      }
    }
    return '';
  }
  OpenIncDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '800px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(AvailableIncidentsDisplayComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data => {
        //console.log("Dialog output:", data);
        if(data !== undefined){
          this.basicInfoForm.controls['incident'].setValue(data);
          this.currentIncId = data.id;
        }  
      }
      
    );
    
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
    get Address(): AbstractControl {
    return this.basicInfoForm.controls['street'];
    }
    get startDate(): AbstractControl {
    return this.basicInfoForm.controls['startDateTime'];
    }
    get endDate() :AbstractControl{
      return this.basicInfoForm.controls['endDateTime'];
    }
    
    onAddressChanged(){
      let address = this.basicInfoForm.controls['street'].value;
      let found = false;
      this.searchResults.forEach(result => {
        if(result.displayName == address){
          found = true;
        }
      });
      if(found == false){
        this.addressInvalid = true;
        this.Address.setErrors({formatViolation: true});
        return;
      }else{
      this.addressInvalid = false;
      this.Address.setErrors(null);
    }
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
  
}
