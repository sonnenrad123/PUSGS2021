import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { SwitchingPlanService } from '../services/switching-plan/switching-plan.service';
import { UserAccountService } from '../services/user-account/user-account.service';
import { SwitchingPlan } from '../switching-plans/switching-plans.component';

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
  role:string;
  
  documentInvalid:boolean = false;

  modifyModeActivated: boolean = false;

  swpId:string;
  swpReplyData:any;
  swp:SwitchingPlan;

  constructor(private route: ActivatedRoute, private router: Router,private SwitchingPlanService: SwitchingPlanService ,private _snackBar: MatSnackBar, private userService:UserAccountService) {
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
    this.role = this.userService.getRole();
    if(this.router.url.endsWith('AddSwitchingPlan')){
      this.router.navigate(["AddSwitchingPlan/BasicInfo"]);
    }

    this.swpId  = this.route.snapshot.paramMap.get('swpId');
    if(this.swpId != null){
      console.log('Modify switching plan: ' + this.swpId);
      this.modifyModeActivated = true;
      window.sessionStorage.setItem('modifyModeActivated',JSON.stringify(this.modifyModeActivated));
      this.getSWPAndMakeForms();
    }
  }

  getSWPAndMakeForms(){
    this.SwitchingPlanService.getSwitchingPlan(this.swpId).subscribe(
      response =>{
        console.log(response);
        this.swpReplyData = response;
        
        var basicform = 
        {'customId' : this.swpReplyData.customId, 
        'typeOfDocument' : this.swpReplyData.typeOfDocument,
        'warrantForWork' : this.swpReplyData.warrantForWork,
        'status' : this.swpReplyData.status,
        'incident' : this.swpReplyData.incident,
        'street' : this.swpReplyData.street,
        'startDateTime' : this.swpReplyData.startDateTime,
        'endDateTime' : this.swpReplyData.endDateTime,
        'team' : this.swpReplyData.team,
        'createdBy' :this.swpReplyData.createdBy,
        'purpose' : this.swpReplyData.purpose,
        'notes' : this.swpReplyData.notes,
        'company' : this.swpReplyData.company,
        'phoneNo' : this.swpReplyData.phoneNo,
        'dateTimeCreated' : this.swpReplyData.dateTimeCreated,
        }

        if(basicform.status === "Canceled" || basicform.status === "Completed"){
          this.documentInvalid = true;
        } 

        
        window.sessionStorage.setItem('basicInfoForm',JSON.stringify(basicform));
        window.sessionStorage.setItem('ModifySWPObject',JSON.stringify(response));
        window.sessionStorage.setItem('switchingPlanStateForm',JSON.stringify(response.stateChanges));
        window.sessionStorage.setItem('switchingPlanSelectedEquipment',JSON.stringify(response.equipment));
        window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(response.workInstructions));
        window.sessionStorage.setItem('SWPMAttCurrValue', JSON.stringify(response.attachments));
        this.router.navigate(["AddSwitchingPlan/"+this.swpId+"/BasicInfo"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  modifySWP(){
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

    let attachments;
    if(window.sessionStorage.getItem('SWPMAttCurrValue') !== null){      
      attachments = JSON.parse(window.sessionStorage.getItem('SWPMAttCurrValue')) as Array<any>; 
    }

    let id = this.swpReplyData.id;
    let user = this.swpReplyData.user;

    let mergedObjects = {...basicInfoFormValue,...switchingPlanStateValue,stateChangesString,workInstrutcionsString,deviceIds,user,id,attachments};

    if(basicInfoFormValue != null){
      console.log(basicInfoFormValue);

      this.SwitchingPlanService.modifySwitchingPlan(this.swpReplyData.id,mergedObjects).subscribe(
        response =>{
          console.log(response);
          window.sessionStorage.removeItem('basicInfoForm');
          window.sessionStorage.removeItem('switchingPlanStateForm');
          window.sessionStorage.removeItem('switchingPlanSelectedEquipment')
          window.sessionStorage.removeItem('switchingPlanInsForm');
          window.sessionStorage.removeItem('SWPMAttCurrValue');
          this.router.navigate(["SwitchingPlans"]);
          this._snackBar.open('Switching plan modified!','Ok');
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
    window.sessionStorage.removeItem('ModifySWPObject');
    window.sessionStorage.removeItem('modifyModeActivated');
    window.sessionStorage.removeItem('SWPMAttCurrValue');
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
    let attachments;
    if(window.sessionStorage.getItem('SWPMAttCurrValue') !== null){      
      attachments = JSON.parse(window.sessionStorage.getItem('SWPMAttCurrValue')) as Array<any>; 
    }

    let creatorEmail = localStorage.getItem('user');

    let mergedObjects = {...basicInfoFormValue,...switchingPlanStateValue,stateChangesString,workInstrutcionsString,deviceIds,creatorEmail,attachments};

    if(basicInfoFormValue != null){
      console.log(basicInfoFormValue);

      this.SwitchingPlanService.addSwitchingPlan(mergedObjects).subscribe(
        response =>{
          console.log(response);
          window.sessionStorage.removeItem('basicInfoForm');
          window.sessionStorage.removeItem('switchingPlanStateForm');
          window.sessionStorage.removeItem('switchingPlanSelectedEquipment')
          window.sessionStorage.removeItem('switchingPlanInsForm');
          window.sessionStorage.removeItem('SWPMAttCurrValue');
          this.router.navigate(["SwitchingPlans"]);
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

