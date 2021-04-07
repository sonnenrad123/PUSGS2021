import {Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ROUTES} from "../../app/sidebar/sidebar.component";
import { empty } from 'rxjs';
import { ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'navbar-cmp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  private listTitles: any[] = [];
  user!: firebase.default.User;
  location! : Location;
  constructor(location: Location,  private element: ElementRef, private afAuth: AngularFireAuth) { 

    this.location = location;
    this.sidebarVisible = false;
    afAuth.authState.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    

  }
 
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'test';
  }

  getLocation(){
    var location = this.location.path();
    return location;
  }
}
