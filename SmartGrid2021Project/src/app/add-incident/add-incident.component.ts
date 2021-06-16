import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

import { interval, Subscription } from 'rxjs';
import {IncidentServiceService } from '../services/incident/incident-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThisReceiver } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})



export class AddIncidentComponent implements OnInit {
  toggledButton:string;
  activeLinkIndex = 0;
  links = [];
  

  buttonEnabled: boolean;
  triedToCrash: boolean = false;
  intervalFormCheck: any;
  modifyModeActivated: boolean = false;
  
  incidentId:string;
  incidentReplyData:any;
  resolutionForm: FormGroup;

  constructor(private router: Router,private IncidentService: IncidentServiceService,private _snackBar: MatSnackBar,private route: ActivatedRoute) {
    this.links = [
      {
        label: 'Basic Info',
        link: './BasicInfo',
        icon: 'info',
        index: 0
      },
      {
        label: 'Devices',
        link: './Devices',
        icon: 'devices',
        index: 1
      },
      {
        label: 'Resolution',
        link: './Resolution',
        icon: 'more',
        index: 2
      },
      {
        label: 'Calls',
        link: './Calls',
        icon: 'call',
        index: 3
      },
      {
        label: 'Crew',
        link: './Crew',
        icon: 'group',
        index: 4
      },
      {
        label: 'Multimedia attachments',
        link: './MultimediaAttachments',
        icon: 'perm_media',
        index: 5
      },
    ];

    this.buttonEnabled = false;
   }

  ngOnInit(): void {
    this.resolutionForm = new FormGroup({
      'cause': new FormControl('Weather'),
      'subcause': new FormControl('Lighting',[Validators.required]),
      'constructionType': new FormControl('None'),
      'material': new FormControl('Unknown')
    });

    

    this.toggledButton = "BI";
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    
    if(this.router.url.endsWith('AddIncident')){
      this.router.navigate(["AddIncident/BasicInfo"]);
    }
    this.incidentId  = this.route.snapshot.paramMap.get('incidentId');
    if(this.incidentId != null){
      console.log('Modify incident: ' + this.incidentId);
      this.modifyModeActivated = true;
      window.sessionStorage.setItem('modifyModeActivated',JSON.stringify(this.modifyModeActivated));
      this.getIncidentAndMakeForms();
    }
   
  }

  ngAfterViewInit() {
    this.intervalFormCheck = setInterval(() => {
      console.log('Checking session storage for forms.');
      if(window.sessionStorage.getItem('basicInformationForm') != null && window.sessionStorage.getItem('resolutionForm') != null && window.sessionStorage.getItem('incidentSelectedDevices')!=null && window.sessionStorage.getItem('incidentCrewId')!=null){
        var ret = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
        
        
        if(ret.length > 0 && this.modifyModeActivated == false){
          this.buttonEnabled = true;
          this.triedToCrash = false;
        }
        else{
          this.buttonEnabled = false;
          this.triedToCrash = false;
        }
        
       
      }
      else{
        this.buttonEnabled = false;
        this.triedToCrash = false;
      }
    }, 2000);
 }

  ngOnDestroy(){
    clearInterval(this.intervalFormCheck);
    window.sessionStorage.removeItem('basicInformationForm');
    window.sessionStorage.removeItem('resolutionForm');
    window.sessionStorage.removeItem('incidentSelectedDevices');
    window.sessionStorage.removeItem('incidentCrewId');
    window.sessionStorage.removeItem('ModifyIncidentObject');
    window.sessionStorage.removeItem('modifyModeActivated');
    
  }


  toggle(param){
    this.toggledButton = param;
  }
  

  


  submitIncident(){
    console.log("Submit incident.");
    let basicInformationFormValue = JSON.parse(window.sessionStorage.getItem('basicInformationForm'));
    let resolutionFormValue = JSON.parse(window.sessionStorage.getItem('resolutionForm')) ;
    let incidentSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
    let crewId = JSON.parse(window.sessionStorage.getItem('incidentCrewId'));
    let deviceIds = "";
    incidentSelectedDevicestemp.forEach(device => {
      deviceIds = deviceIds + ';' + device.id;
    });

    let creatorEmail = localStorage.getItem('user');


    let mergedObjects = {...basicInformationFormValue,...resolutionFormValue,deviceIds,creatorEmail,crewId};

    if(basicInformationFormValue != null && resolutionFormValue != null && incidentSelectedDevicestemp!=null && incidentSelectedDevicestemp.length > 0){
      console.log(basicInformationFormValue);
      console.log(resolutionFormValue);

      this.IncidentService.addIncident(mergedObjects).subscribe(
        response =>{
          console.log(response);
          window.sessionStorage.removeItem('basicInformationForm');
          window.sessionStorage.removeItem('resolutionForm');
          window.sessionStorage.removeItem('incidentSelectedDevices');
          window.sessionStorage.removeItem('incidentCrewId');
          window.sessionStorage.removeItem('ModifyIncidentObject');
          window.sessionStorage.removeItem('modifyModeActivated');
          this._snackBar.open('Incident added!','Ok');
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      this.triedToCrash = true;
    }
    
    
    //window.sessionStorage.removeItem('basicInformationForm');
  }

  modifyIncident(){
    

    let basicInformationFormValue = JSON.parse(window.sessionStorage.getItem('basicInformationForm'));
    let resolutionFormValue = JSON.parse(window.sessionStorage.getItem('resolutionForm')) ;
    let incidentSelectedDevicestemp = JSON.parse(window.sessionStorage.getItem('incidentSelectedDevices'));
    let crewId = JSON.parse(window.sessionStorage.getItem('incidentCrewId'));
    let deviceIds = "";
    incidentSelectedDevicestemp.forEach(device => {
      deviceIds = deviceIds + ';' + device.id;
    });

    let user = this.incidentReplyData.user;
    let id = this.incidentReplyData.id;
    let mergedObjects = {...basicInformationFormValue,...resolutionFormValue,deviceIds,user,crewId,id};

    this.IncidentService.update(this.incidentReplyData.id,mergedObjects).subscribe
      (
        response =>{
          console.log(response);
          window.sessionStorage.removeItem('basicInformationForm');
          window.sessionStorage.removeItem('resolutionForm');
          window.sessionStorage.removeItem('incidentSelectedDevices');
          window.sessionStorage.removeItem('incidentCrewId');
          this._snackBar.open('Incident with id ' + this.incidentReplyData.id + ' modified!','Ok');
        },
        error => {
          console.log(error);
        }
      );
  }

  getIncidentAndMakeForms(){
      this.IncidentService.getIncident(this.incidentId).subscribe(
        response =>{
          console.log(response);
          this.incidentReplyData = response;
          var IncidentBasicInfoFormValue;
          this.resolutionForm.patchValue(response);

          response.ata = response.ata.split('T')[0];
          response.outageTime = response.outageTime.split('T')[0];
          response.etr = response.etr.split('T')[0];
          response.eta = response.eta.split('T')[0];
          response.scheduledTime = response.scheduledTime.split('T')[0];
          var {id,creatorEmail,crewId,deviceIds,devices,incidentCrew,workRequests,user,cause,subcause,constructionType,material,userId,incidentCrewteamID,...IncidentBasicInfoFormValue} = response;
          
          
          window.sessionStorage.setItem('basicInformationForm',JSON.stringify(IncidentBasicInfoFormValue));
          window.sessionStorage.setItem('ModifyIncidentObject',JSON.stringify(response));
          window.sessionStorage.setItem('incidentSelectedDevices',JSON.stringify(response.devices));
          window.sessionStorage.setItem('incidentCrewId',response.incidentCrew.teamID);
          window.sessionStorage.setItem('resolutionForm',JSON.stringify(this.resolutionForm.value));
          this.router.navigate(["AddIncident/"+this.incidentId+"/BasicInfo"]);
        },
        error => {
          console.log(error);
        }
      )
    }

  





  onIndexChanged(event : MatTabChangeEvent){
    switch(event.index){
      case 0:
        this.toggledButton="BI";
        break;
      case 1:
        this.toggledButton="Devices";
        break;
      case 2:
        this.toggledButton="Resolution";
        break;
      case 3:
        this.toggledButton="Calls";
        break;
      case 4:
        this.toggledButton="Crew";
        break;
      case 5:
        this.toggledButton="MA";
        break;
      case 6:
        this.toggledButton="Equipment";
        break;      
    }

  }
}
