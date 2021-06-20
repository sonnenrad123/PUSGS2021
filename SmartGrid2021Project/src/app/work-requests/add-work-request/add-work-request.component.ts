import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WRStateChange } from 'src/app/models/common/wrstate-change';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';
import { parseWebAPIErrors } from 'src/app/utilities/utils';

@Component({
  selector: 'app-add-work-request',
  templateUrl: './add-work-request.component.html',
  styleUrls: ['./add-work-request.component.css']
})
export class AddWorkRequestComponent implements OnInit {
  activeLinkIndex = 0;
  links = [];
  buttonEnabled: boolean;
  triedToCrash: boolean = false;
  intervalFormCheck: any;
  WRId: string;
  modifyModeActivated: boolean = false;
  workRequestReplyData: any;
  errors:string[] = [];
  hiddenButton: boolean = false;
  constructor(private router: Router, private wrService:WorkRequestsService, private route: ActivatedRoute, private snackBar: MatSnackBar) {

    this.links = [
      {
        label: 'Basic Info',
        link: './BasicInfo',
        icon: 'info',
        index: 0
      },
      {
        label: 'Changes History',
        link: './ChangesHistory',
        icon: 'history',
        index: 1
      },
      {
        label: 'Multimedia Attachments',
        link: './MultimediaAttachments',
        icon: 'perm_media',
        index: 2
      },
      {
        label: 'Equipment',
        link: './Equipment',
        icon: 'important_devices',
        index: 3
      },
    ];
   }

  ngOnInit(): void {
  this.hiddenButton = false;
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    
    if(this.router.url.endsWith('createworkrequest')){
      this.router.navigate(["createworkrequest/BasicInfo"]);
    }
    
    this.WRId  = this.route.snapshot.paramMap.get('id');
    if(this.WRId != null){
      console.log('Modify work request: ' + this.WRId);
      this.modifyModeActivated = true;
      
      window.sessionStorage.setItem('modifyModeActivated', JSON.stringify(this.modifyModeActivated));
      
      this.getWRAndMakeForms();
    }
  }

  SubmitWR(){
    this.wrService.CreateNewWR().subscribe(
      (data)=>{
        this.errors = [];
        this.snackBar.open('Work request created successfully!', 'OK');
        this.router.navigate(['WorkRequests']);
     },
     (err) =>{
       console.log(err);
       this.errors = parseWebAPIErrors(err);
     } );
  }
  
  UpdateWR(){
    this.wrService.UpdateWR().subscribe(
      (data) => {
        console.log('dsfsdfsd');
        this.errors = [];
        this.snackBar.open('Work request updated successfully!', 'OK');
        this.router.navigate(['WorkRequests']);
      },
      (err) => {
        console.log(err);
        this.errors = parseWebAPIErrors(err);
        this.snackBar.open(this.errors.toString(), 'OK');
      }
    );
  }

  getWRAndMakeForms(){
    this.wrService.get(this.WRId).subscribe(
      response =>{
        console.log(response);
        this.workRequestReplyData = response;
      
        window.sessionStorage.setItem('WRBICurrValue',JSON.stringify(response));
        window.sessionStorage.setItem("WR_ID", JSON.stringify(response.wR_id));
        window.sessionStorage.setItem('ModifyIncidentObject',JSON.stringify(response));
        window.sessionStorage.setItem('WREquCurrValue',JSON.stringify(response.equipment));
        window.sessionStorage.setItem('WRCHCurrValue', JSON.stringify(response.stateChangesHistory));
        window.sessionStorage.setItem('LastWRCH', JSON.stringify(response.stateChangesHistory[response.stateChangesHistory.length - 1]));
        window.sessionStorage.setItem('WRMAttCurrValue',JSON.stringify(response.attachments));
       
        this.router.navigate(["createworkrequest/"+this.WRId+"/BasicInfo"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit() {
    this.intervalFormCheck = setInterval(() => {
      console.log('Checking session storage for forms.');
      if(window.sessionStorage.getItem('WRBICurrValue') != null  
         //window.sessionStorage.getItem('WRCHCurrValue') != null && 
         //window.sessionStorage.getItem('WREquCurrValue')!=null && 
         //window.sessionStorage.getItem('LastWRCH')!=null &&
         //window.sessionStorage.getItem('WRMAttCurrValue')!=null
         ){

        
        
     
      
        if( this.modifyModeActivated == false){
          this.buttonEnabled = true;
          this.triedToCrash = false;
        }
        else{
          this.buttonEnabled = false;
          this.triedToCrash = false;
        }
        //console.log(this.buttonEnabled);
       
      }
      else{
        this.buttonEnabled = false;
        this.triedToCrash = false;
      }
      
    }, 2000);
 }

  ngOnDestroy(){
    clearInterval(this.intervalFormCheck);
    window.sessionStorage.removeItem('WRBICurrValue');
    window.sessionStorage.removeItem('WRCHCurrValue');
    window.sessionStorage.removeItem('WREquCurrValue');
    window.sessionStorage.removeItem('LastWRCH');
    window.sessionStorage.removeItem('WRMAttCurrValue');
    window.sessionStorage.removeItem('modifyModeActivated');
    window.sessionStorage.removeItem('WR_ID');
    window.sessionStorage.removeItem('ModifyIncidentObject');
    
  }
  onChanged($event){
    console.log($event);
  }
}
