import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

import { interval, Subscription } from 'rxjs';




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
  

  constructor(private router: Router) {
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
    
    this.toggledButton = "BI";
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    
    if(this.router.url.endsWith('AddIncident')){
      this.router.navigate(["AddIncident/BasicInfo"]);
    }
    
   
  }

  ngAfterViewInit() {
    this.intervalFormCheck = setInterval(() => {
      console.log('Checking session storage for forms.');
      if(window.sessionStorage.getItem('basicInformationForm') != null && window.sessionStorage.getItem('resolutionForm') != null){
        this.buttonEnabled = true;
        this.triedToCrash = false;
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
  }


  toggle(param){
    this.toggledButton = param;
  }
  

  


  submitIncident(){
    console.log("Submit incident.");
    let basicInformationFormValue = JSON.parse(window.sessionStorage.getItem('basicInformationForm'));
    let resolutionFormValue = JSON.parse(window.sessionStorage.getItem('resolutionForm')) ;
    
    if(basicInformationFormValue != null && resolutionFormValue != null){
      console.log(basicInformationFormValue);
      console.log(resolutionFormValue);
    }
    else{
      this.triedToCrash = true;
    }
    
    
    //window.sessionStorage.removeItem('basicInformationForm');
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
