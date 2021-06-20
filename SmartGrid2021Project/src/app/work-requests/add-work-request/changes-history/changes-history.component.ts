import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WRStateChange } from 'src/app/models/common/wrstate-change';
import { WorkRequestDocumentState } from 'src/app/models/work-reques-doc-state/work-request-document-state.enum';
import { SaveChangesComponent } from 'src/app/security/save-changes/save-changes.component';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-changes-history',
  templateUrl: './changes-history.component.html',
  styleUrls: ['./changes-history.component.css']
})
export class ChangesHistoryComponent implements OnInit {
  Form : FormGroup;
  documentStatus = WorkRequestDocumentState;
  changesHistory: any[] = [];
  disabledButton: boolean = false;
  formDisabledButton: boolean = false;
  errors:string[] = [];
  constructor(private wrService: WorkRequestsService, private router:Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.errors = [];
    
    this.formDisabledButton = false;
    this.Form = new FormGroup({
      changedByUser: new FormControl('', Validators.required),
      changedOn: new FormControl('', Validators.required),
      wrCurrentState: new FormControl('', Validators.required)
    });

    this.Form.controls['changedByUser'].setValue(localStorage.getItem('user'));
    this.Form.controls['changedOn'].setValue(formatDate(new Date(), "yyyy-MM-dd", "en_US"));
    if(window.sessionStorage.getItem('WRCHCurrValue') !== null){
      var Allchs = JSON.parse(window.sessionStorage.getItem('WRCHCurrValue'));
      var lastChange = JSON.parse(window.sessionStorage.getItem('LastWRCH'));
      
      this.Form.controls['wrCurrentState'].setValue(lastChange.wrCurrentState.toString());
      this.disabledButton = lastChange.wrCurrentState === this.Form.controls['wrCurrentState'].value;
      
      console.log(this.disabledButton);
      this.changesHistory = Allchs;
      if(lastChange.wrCurrentState === 'CANCELED' || lastChange.wrCurrentState === 'APPROVED'){
        this.Form.disable();
        this.formDisabledButton = true;
      }
      else if(lastChange.wrCurrentState === 'DENIED'){
        
      }
    }else{
      this.Form.controls['wrCurrentState'].setValue('DRAFT');
      window.sessionStorage.removeItem('WRCHCurrValue');
      window.sessionStorage.setItem('WRCHCurrValue', JSON.stringify(this.Form.value));
    }

    this.Form.valueChanges.subscribe(
      (data) => {
        console.log(data);
        const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.minWidth = '400px';
   dialogConfig.minHeight = '200px';
   const dialogRef = this.dialog.open(SaveChangesComponent, dialogConfig);
   
   dialogRef.afterClosed().subscribe(
     data => {
       //console.log("Dialog output:", data);
       if(data !== undefined){
         console.log(data);
         this.SaveChanges();
       }
       
     }
     
   );
      }
    );
  }
  WRDocStatusKeys(): Array<string>{
    var keys = Object.keys(this.documentStatus).filter(s => s !== this.documentStatus.DRAFT);
    return keys;
  }
  SaveChanges(){
    window.sessionStorage.removeItem('LastWRCH');
    window.sessionStorage.setItem('LastWRCH', JSON.stringify(this.Form.value));
  }
  getErrorMessageWRCurrentState(){
    const field = this.Form.get('wrCurrentState');
    if(field !== null){
      if(field.hasError('required')){
        return 'The WRState field is required';
      }
    }
    return '';
  }
  Cancel(){
    this.router.navigate(['WorkRequests']);
  }
}
