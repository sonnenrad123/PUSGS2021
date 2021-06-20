
import { ProviderAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NominatimResponse } from 'src/app/models/nominatim-response/nominatim-response.model';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';

export enum WorkType{
  Planned = 'Planned',
  Unplanned = 'Unplanned'
}

@Component({
  selector: 'app-add-plan-basic',
  templateUrl: './add-plan-basic.component.html',
  styleUrls: ['./add-plan-basic.component.css'],
})
export class AddPlanBasicComponent implements OnInit {

  basicInfoForm: FormGroup;
  workTypes = WorkType;

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;

  constructor(private nominatimService: NominatimService) { }

  ngOnInit(): void {
    let userEmail = localStorage.getItem('user');
    this.basicInfoForm = new FormGroup({
      'customId' : new FormControl('SP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl('', [Validators.required]),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl('',[Validators.required]),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl(userEmail,[Validators.required]) ,
      'purpose' : new FormControl(''),
      'notes' : new FormControl(''),
      'company' : new FormControl('',[Validators.required]),
      'phoneNo' : new FormControl(''),
      'dateTimeCreated' : new FormControl(new Date(),[Validators.required])
    });

    let formValue = window.sessionStorage.getItem('basicInfoForm');
      if(formValue!=null){
      this.basicInfoForm.setValue(JSON.parse(formValue));
      }

  }

  onClear(){
    let userEmail = localStorage.getItem('user');
    this.basicInfoForm = new FormGroup({
      'customId' : new FormControl('SP'), 
      'typeOfDocument' : new FormControl(this.workTypes.Planned, [Validators.required]),
      'warrantForWork' : new FormControl('', [Validators.required]),
      'status' : new FormControl('Draft',[Validators.required]),
      'incident' : new FormControl('',[Validators.required]),
      'street' : new FormControl('',[Validators.required]),
      'startDateTime' : new FormControl(new Date(),[Validators.required]),
      'endDateTime' :new FormControl(new Date(),[Validators.required]) ,
      'team' : new FormControl('',[Validators.required]),
      'createdBy' :new FormControl(userEmail,[Validators.required]) ,
      'purpose' : new FormControl(''),
      'notes' : new FormControl(''),
      'company' : new FormControl('',[Validators.required]),
      'phoneNo' : new FormControl(''),
      'dateTimeCreated' : new FormControl(new Date(),[Validators.required])
    });

    window.sessionStorage.removeItem('basicInfoForm');
  }

  onSubmit() {
    window.sessionStorage.setItem('basicInfoForm',JSON.stringify(this.basicInfoForm.value));

  }

  WorkTypeKeys(): Array<string>{
    var keys = Object.keys(this.workTypes);
    return keys;
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


}
