import {Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ROUTES} from "../../app/sidebar/sidebar.component";
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'navbar-cmp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  private listTitles: any[] = [];
  private listCTitles: any[] = [];
  user!: string;
  location! : Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private oAuth: SocialAuthService) { 

    this.location = location;
    this.sidebarVisible = false;
    //afAuth.authState.subscribe(x => this.user = x);
    this.user = localStorage.getItem('user');
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
    console.log()
  }

  getPath(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].path;
        }
    }
    console.log()
  }

  getLocation(){
    var location = this.location.path();
    return location;
  }

  logOut(){
    this.oAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
