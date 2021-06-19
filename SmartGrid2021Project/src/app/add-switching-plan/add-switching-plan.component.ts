import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SwitchingPlanService } from '../services/switching-plan/switching-plan.service';

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

  constructor(private router: Router,private SwitchingPlanService: SwitchingPlanService ,private _snackBar: MatSnackBar) {
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
    this.intervalFormCheck = setInterval(() => {
      console.log('Checking session storage for forms.');
      if(window.sessionStorage.getItem('basicInfoForm') != null)
      {
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
    window.sessionStorage.removeItem('basicInfoForm');
    window.sessionStorage.removeItem('switchingPlanStateForm') ;
    window.sessionStorage.removeItem('switchingPlanSelectedEquipment');
    window.sessionStorage.removeItem('switchingPlanInsForm');
  }

  toggle(param){
    this.toggledButton = param;
  }

  submitSwitchingPlan(){
    console.log("Submit Switching Plan.");
    let basicInfoFormValue = JSON.parse(window.sessionStorage.getItem('basicInfoForm'));
    let switchingPlanStateValue = JSON.parse(window.sessionStorage.getItem('switchingPlanStateForm')) ;
    let switchingPlanSelectedEquipmentValue = JSON.parse(window.sessionStorage.getItem('switchingPlanSelectedEquipment'));
    let switchingPlanInsFormValue = JSON.parse(window.sessionStorage.getItem('switchingPlanInsForm'))

    let deviceIds = "";
    if(switchingPlanSelectedEquipmentValue !=null){
    switchingPlanSelectedEquipmentValue.forEach(device => {
      deviceIds = deviceIds + ';' + device.id;
    });
    }
    
    let stateChangesString =""
    if(switchingPlanStateValue != null){
    switchingPlanStateValue.forEach(state => {
      stateChangesString = stateChangesString + ';' + state.state;
    });
    } 

    let workInstrutcionsString = ""
    if(switchingPlanInsFormValue !=null){
      switchingPlanInsFormValue.forEach(ins=>{
        workInstrutcionsString = workInstrutcionsString + ';' + ins.desc + ',' + ins.device + ',' + ins.executed;
      });
    }

    let creatorEmail = localStorage.getItem('user');

    let mergedObjects = {...basicInfoFormValue,...switchingPlanStateValue,stateChangesString,workInstrutcionsString,deviceIds,creatorEmail};

    if(basicInfoFormValue != null){
      console.log(basicInfoFormValue);

      this.SwitchingPlanService.addSwitchingPlan(mergedObjects).subscribe(
        response =>{
          console.log(response);
          window.sessionStorage.removeItem('basicInfoForm');
          window.sessionStorage.removeItem('switchingPlanStateForm');
          window.sessionStorage.removeItem('switchingPlanSelectedEquipment')
          window.sessionStorage.removeItem('switchingPlanInsForm');
          this._snackBar.open('Switching plan added!','Ok');
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      this.triedToCrash = true;
    }
    
    
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

