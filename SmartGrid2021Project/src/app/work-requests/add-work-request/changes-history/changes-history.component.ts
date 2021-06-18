import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WRStateChange } from 'src/app/models/common/wrstate-change';
import { WorkRequestDocumentState } from 'src/app/models/work-reques-doc-state/work-request-document-state.enum';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-changes-history',
  templateUrl: './changes-history.component.html',
  styleUrls: ['./changes-history.component.css']
})
export class ChangesHistoryComponent implements OnInit {
  Form : FormGroup;
  documentStatus = WorkRequestDocumentState;
  constructor(private wrService: WorkRequestsService, private router:Router) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      changedByUser: new FormControl('', Validators.required),
      changedOn: new FormControl('', Validators.required),
      WRCurrentState: new FormControl('', Validators.required)
    });

    this.Form.controls['changedByUser'].setValue(localStorage.getItem('user'));
    this.Form.controls['changedOn'].setValue(formatDate(new Date(), "yyyy-MM-dd", "en_US"));
    if(window.sessionStorage.getItem('WRCHCurrValue') !== null){
      this.Form.patchValue(JSON.parse(window.sessionStorage.getItem('WRCHCurrValue')));
    }
  }
  WRDocStatusKeys(): Array<string>{
    var keys = Object.keys(this.documentStatus);
    return keys;
  }
  SaveChanges(){
    window.sessionStorage.removeItem('WRCHCurrValue');
    window.sessionStorage.setItem('WRCHCurrValue', JSON.stringify(this.Form.value));
  }
  getErrorMessageWRCurrentState(){
    const field = this.Form.get('WRCurrentState');
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
