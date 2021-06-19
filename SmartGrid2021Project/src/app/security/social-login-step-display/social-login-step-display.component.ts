import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NominatimResponse } from 'src/app/models/nominatim-response/nominatim-response.model';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';

@Component({
  selector: 'app-social-login-step-display',
  templateUrl: './social-login-step-display.component.html',
  styleUrls: ['./social-login-step-display.component.css']
})
export class SocialLoginStepDisplayComponent implements OnInit {
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;

  constructor(private dialog: MatDialogRef<SocialLoginStepDisplayComponent>, private nominatimService: NominatimService) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }
  get Address(): AbstractControl {
    return this.form.controls['address'];
  }
  getErrorMessageAddress(){
    const field = this.form.get('address');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The address field is required';
      }
      if(field.hasError('formatViolation')){
        return 'Incorrect address format! Press ENTER for searching...'
      }
    }
    return '';
  }

  getErrorMessageBirthday(){
    const field = this.form.get('dateOfBirth');
      
    if(field !== null){
      if(field !== null){
        if(field.hasError('required')){
          return 'The birthday field is required';
        }
      }
    }
    return '';
  }
  getErrorMessagePassword(){
    const field = this.form.get('password');
    
    if(field !== null){
    if(field.hasError('required')){
      return 'The password field is required';
    }
    if(field.hasError('minlength')){
      return 'Password must contains at least 8 characters';
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
    this.form.controls['address'].setValue(result.displayName);
  }
  onAddressChanged(){
    let address = this.form.controls['address'].value;
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
  Cancel(){
    this.dialog.close();
  }

  Continue(){
    this.dialog.close(this.form.value);
  }
}
