import {Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ROUTES} from "../../app/sidebar/sidebar.component";
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { UserAccountService } from '../services/user-account/user-account.service';
import { Notification } from '../notifications/notifications.component';
import { NotificationService } from '../services/notification/notification.service';
import { MatTableDataSource } from '@angular/material/table';

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

  responseData:any[];
  notifications:Notification[]=[];
  tempnot:Notification[];

  count:number = 0;

  
  intervalCheck:any;

  user!: string;
  location! : Location;
  constructor(private NotificationService: NotificationService,location: Location,  private element: ElementRef, private router: Router, private oAuth: SocialAuthService,private userService: UserAccountService) { 

    this.location = location;
    this.sidebarVisible = false;
    //afAuth.authState.subscribe(x => this.user = x);
    this.user = this.userService.getFieldFromJWT('email');
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.readData();
  }

  ngAfterViewInit():void{
    this.intervalCheck = setInterval(() => {
      this.readData();
    }, 25000);
  }

  readData(){
    this.NotificationService.getNotifications().subscribe(
      not => {
        this.responseData = not;
        if(not != null){
        this.tempnot = this.responseData;
        let counter = 0;
        this.count = 0;
        this.notifications = [];
        this.tempnot.forEach(not =>{
            if(not.color == "#969696"){
              this.count = this.count + 1;
              if(counter < 5)
                this.notifications.push(not);

              counter = counter+ 1;
            }
        });
        }
        //console.log(not);
      },
      error => {
        console.log(error);
      }
    );
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
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
