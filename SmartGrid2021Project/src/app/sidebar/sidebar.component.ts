import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportOutageDialogComponent } from '../report-outage-dialog/report-outage-dialog.component';
import { UserAccountService } from '../services/user-account/user-account.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/SearchNetworkElements', title:'Search', icon: 'pe-7s-search',class:''},
    { path: '/test',title:'Dashboard',icon:'pe-7s-graph',class:''},
    { path: '/Report', title: 'Report', icon: 'pe-7s-call', class: ''},

    //{ path: '/NoRoute',title:'Dashboard',icon:'pe-7s-graph',class:''},
    
    { path: '/IncidentBrowser',title:'Incidents browser', icon: 'pe-7s-note2',class:''}, 
    
    { path: '/map', title: 'Map', icon: 'pe-7s-map', class:''},
    { path: '/docs', title: 'Documents', icon:'pe-7s-folder', class:'', children:[
      {
        path: '/WorkRequests', title: 'Work Requests', icon: 'pe-7s-note2', class: '', children:[]
      },
      {
        path: '/SwitchingPlans', title: 'Switching Plans', icon: 'pe-7s-note2', class: '', children:[]
      },
      {
        path: '/SafetyDocuments', title: 'Safety Documents', icon: 'pe-7s-note2', class: '', children:[]
      }
    ]},
    { path: '/AddNetworkElement', title: 'Add network element',icon: 'pe-7s-network',class:''},
   // { path:'/NoRoute', title:'Add consumer',icon:'pe-7s-add-user',class:''},
    { path: '/TeamsView', title:'Add teams',icon:'pe-7s-users',class:''},
    

    { path: '/NoRoute', title: 'Notifications' , icon:'pe-7s-bell', class:'secondary'},
    { path: '/NoRoute', title:'Settings',icon:'pe-7s-tools',class:'secondary'},
    { path: '/AllUsers', title: 'All Users', icon:'pe-7s-users', class: ''},
    //ispod su hidden rute da bi title funkcija radila

    { path: '/AddIncident', title:'Add incident',icon:'',class:'hidden'},
    { path: '/WorkRequests', title: 'Work Requests', icon: 'pe-7s-note2', class: 'hidden'},
    { path: '/SafetyDocuments', title: 'Safety Documents', icon: 'pe-7s-note2', class: 'hidden'},
    //{ path: '/switchingplans', title: 'Switching Plans', icon: 'pe-7s-note2', class: '' }
];




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
 
})


export class SidebarComponent implements OnInit {
  menuItems!: any[];
  showSubMenu: boolean;
  role;
  constructor(private sec: UserAccountService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.showSubMenu = false;
    this.role = this.sec.getRole();
    console.log(this.role);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};
hideShowSubmenu(){
  this.showSubMenu = !this.showSubMenu;
  console.log(this.showSubMenu);
}
reportDialog(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  const dialogRef = this.dialog.open(ReportOutageDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    data => {
    });
}
}
