import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/Search', title:'Search', icon: 'pe-7s-search',class:''},
    { path: '/NoRoute',title:'Dashboard',icon:'pe-7s-graph',class:''},
    { path: '/IncidentBrowser',title:'Incidents browser', icon: 'pe-7s-note2',class:''}, 
    
    { path: '/map', title: 'Map', icon: 'pe-7s-map', class:''},
    { path: '/NoRoute', title: 'Add network element',icon: 'pe-7s-network',class:''},
    { path:'/NoRoute', title:'Add consumer',icon:'pe-7s-add-user',class:''},
    { path: '/NoRoute', title:'Add teams',icon:'pe-7s-users',class:''},
    

    { path: '/NoRoute', title: 'Notifications' , icon:'pe-7s-bell', class:'secondary'},
    { path: '/NoRoute', title:'Settings',icon:'pe-7s-tools',class:'secondary'}
  
];




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
 
})


export class SidebarComponent implements OnInit {
  menuItems!: any[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

}
