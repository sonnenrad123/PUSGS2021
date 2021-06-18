import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-switching-plan',
  templateUrl: './add-switching-plan.component.html',
  styleUrls: ['./add-switching-plan.component.css']
})
export class AddSwitchingPlanComponent implements OnInit {

  toggledButton:string;
  activeLinkIndex = 0;
  links = [];

  buttonEnabled: boolean;
  triedToCrash: boolean = false;
  intervalFormCheck: any;

  constructor(private router: Router,/*private IncidentService: IncidentServiceService,*/private _snackBar: MatSnackBar) {
    this.links = [
      {
        label: 'Basic Info',
        link: './BasicInfo',
        icon: 'info',
        index: 0
      },
      {
        label: 'State changes',
        link: './StateChanged',
        icon: 'history',
        index: 1
      },
      {
        label: 'Attachments',
        link: './Attachments',
        icon: 'perm_media',
        index: 2
      },
      {
        label: 'Equipment',
        link: './Equipment',
        icon: 'devices',
        index: 3
      },
      {
        label: 'Work instructions',
        link: './WorkInstructions',
        icon: 'perm_device_information',
        index: 4
      },
    ];

    this.buttonEnabled = false;
   }

  ngOnInit(): void {
    this.toggledButton = "BI";
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    
    if(this.router.url.endsWith('AddSwitchingPlan')){
      this.router.navigate(["AddSwitchingPlan/BasicInfo"]);
    }
  }

  ngAfterViewInit() {
     
  }
  
  ngOnDestroy(){

  }

  toggle(param){
    this.toggledButton = param;
  }

  submitSwitchingPlan(){
    console.log("Submit Switching Plan.");

    //window.sessionStorage.removeItem('basicInformationForm');
  }

  onIndexChanged(event : MatTabChangeEvent){
    switch(event.index){
      case 0:
        this.toggledButton="BI";
        break;
      case 1:
        this.toggledButton="History";
        break;
      case 2:
        this.toggledButton="Attachments";
        break;
      case 3:
        this.toggledButton="Equipment";
        break;
      case 4:
        this.toggledButton="Instructions";
        break;
    }
  }
}

