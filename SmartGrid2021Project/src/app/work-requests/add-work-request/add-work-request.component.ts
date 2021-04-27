import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-work-request',
  templateUrl: './add-work-request.component.html',
  styleUrls: ['./add-work-request.component.css']
})
export class AddWorkRequestComponent implements OnInit {
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
    this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    this.router.navigate(["createworkrequest/BasicInfo"]);
  }
}
