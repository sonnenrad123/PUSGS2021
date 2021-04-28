import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  toggledButton:string;
  activeLinkIndex = 0;
  links = [];
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
   }

  ngOnInit(): void {
    this.toggledButton = "BI";
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    
    if(this.router.url.endsWith('AddIncident')){
      this.router.navigate(["AddIncident/BasicInfo"]);
    }
  }


  toggle(param){
    this.toggledButton = param;
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
