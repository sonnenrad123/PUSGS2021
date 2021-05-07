import { Component, OnInit, ViewChild } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-network-element',
  templateUrl: './add-network-element.component.html',
  styleUrls: ['./add-network-element.component.css']
})
export class AddNetworkElementComponent implements OnInit {
  newNetworkElementForm: FormGroup;
  constructor() { }
  elementTypes: string[] = ['Breaker','Disconnector','LoadBreak','Fuse','Switch'];
  
  ngOnInit(): void {
    this.newNetworkElementForm = new FormGroup({
      'type':new FormControl('',Validators.required),
      'id': new FormControl('1',Validators.required),
      'name':new FormControl('',Validators.required),
      'address':new FormControl('',Validators.required),
      'coordinates':new FormControl('',Validators.required),
    });
  }



  onSubmit() {
    console.log(JSON.stringify(this.newNetworkElementForm.value));

  }

  generateName(){
    let type = this.newNetworkElementForm.controls['type'].value;
    let id = this.newNetworkElementForm.controls['id'].value;
    var typeFirstThree = type.substring(0,3).toUpperCase();
    
    
    this.newNetworkElementForm.controls['name'].setValue(typeFirstThree + id);
  }
}
