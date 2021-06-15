import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-changes-history',
  templateUrl: './changes-history.component.html',
  styleUrls: ['./changes-history.component.css']
})
export class ChangesHistoryComponent implements OnInit {
  Form : FormGroup;

  constructor(private wrService: WorkRequestsService, private router:Router) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      changedByUser: new FormControl('', Validators.required),
      changedOn: new FormControl('', Validators.required),
      WRCurrentState: new FormControl('', Validators.required)
    });

    this.Form.controls['changedByUser'].setValue(localStorage.getItem('user'));
    this.Form.controls['changedOn'].setValue(formatDate(new Date(), "yyyy-MM-dd", "en_US"));

    if(WorkRequestsService.wrStateChanged !== undefined){
      this.Form.setValue({
        changedByUser: WorkRequestsService.wrStateChanged.changedByUser,
        changedOn: WorkRequestsService.wrStateChanged.changedOn,
        WRCurrentState: WorkRequestsService.wrStateChanged.WRCurrentState
      });
    }
  }

  SaveChanges(){
    this.wrService.SaveStateChanging(this.Form.value);
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
