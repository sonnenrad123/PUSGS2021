import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-safety-document',
  templateUrl: './add-safety-document.component.html',
  styleUrls: ['./add-safety-document.component.css']
})
export class AddSafetyDocumentComponent implements OnInit {
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
        label: 'History of state changes',
        link: './StatesHistory',
        icon: 'change_history',
        index: 1
      },
      {
        label: 'Multimedia attachments',
        link: './MultimediaAttachments',
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
        label: 'Checklist',
        link: './Checklist',
        icon: 'perm_device_information',
      }
    ];

    this.buttonEnabled = false;

  }

  ngOnInit(): void {
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    if(this.router.url.endsWith('AddSafetyDocument')){
      this.router.navigate(["AddSafetyDocument/BasicInfo"]);
    }
  }


  ngAfterViewInit() {
    this.intervalFormCheck = setInterval(() => {
      console.log('Checking session storage for forms.');
      if(window.sessionStorage.getItem('AddSafetyDocumentBasicInformationForm') != null && window.sessionStorage.getItem('AddSafetyDocumentChecklist') != null){
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
  window.sessionStorage.removeItem('AddSafetyDocumentBasicInformationForm');
  window.sessionStorage.removeItem('AddSafetyDocumentChecklist');
}


submitSafetyDocument(){
  console.log("Submit safety document.");
  let basicInformationFormValue = JSON.parse(window.sessionStorage.getItem('AddSafetyDocumentBasicInformationForm'));
  let checkListFormValue = JSON.parse(window.sessionStorage.getItem('AddSafetyDocumentChecklist'))
  
  if(basicInformationFormValue != null && checkListFormValue != null){
    console.log(window.sessionStorage.getItem('AddSafetyDocumentBasicInformationForm'));
    console.log(window.sessionStorage.getItem('AddSafetyDocumentChecklist'));
  }
  else{
    this.triedToCrash = true;
  }
  
  
  //window.sessionStorage.removeItem('basicInformationForm');
}

}
