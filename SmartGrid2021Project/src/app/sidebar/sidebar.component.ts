import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/Search', title:'Search', icon: 'pe-7s-search',class:''},
    { path: '/NoRoute',title:'Dashboard',icon:'pe-7s-graph',class:''},
    { path: '/IncidentBrowser',title:'Incidents browser', icon: 'pe-7s-note2',class:''}, 
    
    { path: '/map', title: 'Map', icon: 'pe-7s-map', class:''},
    { path: '/docs', title: 'Documents', icon:'pe-7s-folder', class:'', children:[
      {
        path: '/workrequests', title: 'Work Requests', icon: 'pe-7s-note2', class: '', children:[]
      },
      {
        path: '/switchingplans', title: 'Switching Plans', icon: 'pe-7s-note2', class: '', children:[]
      },
      {
        path: '/child3', title: 'Safety Documents', icon: 'pe-7s-note2', class: '', children:[]
      }
    ]},
    { path: '/NoRoute', title: 'Add network element',icon: 'pe-7s-network',class:''},
    { path:'/NoRoute', title:'Add consumer',icon:'pe-7s-add-user',class:''},
    { path: '/NoRoute', title:'Add teams',icon:'pe-7s-users',class:''},
    

    { path: '/NoRoute', title: 'Notifications' , icon:'pe-7s-bell', class:'secondary'},
    { path: '/NoRoute', title:'Settings',icon:'pe-7s-tools',class:'secondary'},

    { path: '/AddIncident', title:'Add incident',icon:'',class:'hidden'}
  
];




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
 
})


export class SidebarComponent implements OnInit {
  menuItems!: any[];
  showSubMenu: boolean;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.showSubMenu = false;
    

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
}
