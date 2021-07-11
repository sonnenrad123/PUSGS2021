import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import { NominatimService } from '../services/nominatim/nominatim.service';
import { StreetPriorityService } from '../services/street-priority/street-priority.service';

export interface StreetPriority{
  address:string;
  priority:number;
}

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.css']
})
export class SettingsComponentComponent implements OnInit {

  spForm:FormGroup;
  dataSource:MatTableDataSource<StreetPriority>;
  displayedColumns:string[]=['priority', 'address']
  allStreetPriorities:StreetPriority[];
  sortedData: StreetPriority[];
  responseData:any[];
  sp:StreetPriority;
  update:boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;


  constructor(private nominatimService: NominatimService,private streetService: StreetPriorityService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.spForm = new FormGroup({
      'address': new FormControl('',Validators.required),
      'priority': new FormControl(0,Validators.required)
    });
    this.update = false;
    this.readData();
  }

  readData(){
    this.streetService.getStreetPriorities().subscribe(response =>{
      console.log(response);
      this.responseData = response;
      this.allStreetPriorities = this.responseData;
      this.dataSource = new MatTableDataSource(this.allStreetPriorities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error => {
      console.log(error);
    });
  }

  onSubmit(){
    const sp = this.spForm.value
    this.sp = sp;
    this.allStreetPriorities.forEach(x=>{
      if(x.address == this.sp.address){
        x.priority = this.sp.priority;
        this.update = true;
      }
    });

    if(this.update){
      this.streetService.update(this.sp.address, this.sp).subscribe(response =>{this._snackBar.open("Successfully updated new priority.", "Ok.");this.readData();this.onClear();}, error=>{console.log(error)});
    }else{
      this.allStreetPriorities.push(this.sp);
      this.streetService.addStreetPriority(this.sp).subscribe(response =>{this._snackBar.open("Successfully added new priority.", "Ok.");this.readData();this.onClear();}, error=>{console.log(error)});
    }

    this.update = false;
  }

  onClear(){
    this.spForm = new FormGroup({
      'address': new FormControl('',[Validators.required, Validators.max(10), Validators.min(0)]),
      'priority': new FormControl(0,Validators.required)
    });
  }

  getErrorMessageAddress(){
    const field = this.spForm.get('address');
    
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

  get Address(): AbstractControl {
    return this.spForm.controls['address'];
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
    this.spForm.controls['address'].setValue(result.displayName);
  }
  onAddressChanged(){
    let address = this.spForm.controls['address'].value;
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

}
