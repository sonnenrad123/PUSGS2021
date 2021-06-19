import { Component, OnInit, ViewChild } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MapPoint } from '../models/map-point/map-point.model';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import {DeviceService} from '../services/device/device.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-network-element',
  templateUrl: './add-network-element.component.html',
  styleUrls: ['./add-network-element.component.css']
})
export class AddNetworkElementComponent implements OnInit {
  newNetworkElementForm: FormGroup;
  constructor(private DeviceService:DeviceService,private _snackBar: MatSnackBar) { }
  generatedID:any;
  elementTypes: string[] = ['Breaker','Disconnector','LoadBreak','Fuse','Switch'];


  AddressResults: NominatimResponse[];
  mapPoint: MapPoint;



  ngOnInit(): void {
    this.newNetworkElementForm = new FormGroup({
      'type':new FormControl('',Validators.required),
      'id': new FormControl('',Validators.required),
      'name':new FormControl('',Validators.required),
      'address':new FormControl('',Validators.required),
      'coordinates':new FormControl('',Validators.required),
    });
    this.generateNewID();
  }



  onSubmit() {
    console.log(JSON.stringify(this.newNetworkElementForm.value));
    this.DeviceService.addDevice(this.newNetworkElementForm.value).subscribe(
      response =>{
        console.log(response);
        this.generateNewID();
        this._snackBar.open('Device added!','Ok');
      },
      error => {
        this._snackBar.open('Max number of devices in same street exceeded!','Ok');
      }
    );
    
  }

  generateNewID(){
    this.DeviceService.getMaxDeviceID().subscribe(
      response => {
        console.log('Max id is: ' + response);
        this.generatedID = response+1;
        this.newNetworkElementForm.controls['id'].setValue(this.generatedID);
        this.generateName();
      },
      error => {
        console.log(error);
      }
    );
  }

  generateName(){
    let type = this.newNetworkElementForm.controls['type'].value;
    let id = this.newNetworkElementForm.controls['id'].value;
    var typeFirstThree = type.substring(0,3).toUpperCase();
    
    
    this.newNetworkElementForm.controls['name'].setValue(typeFirstThree + id);
  }

  refreshSearchList(results: NominatimResponse[]) {
    this.AddressResults = results;
  }
  
  getAddress(result: NominatimResponse){
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.newNetworkElementForm.controls['coordinates'].setValue('Lat: ' + result.latitude + '  Lon: ' + result.longitude);
    this.newNetworkElementForm.controls['address'].setValue(result.displayName);
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }
}
