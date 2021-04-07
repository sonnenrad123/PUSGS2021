import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/map', title: 'Map', icon: 'pe-7s-map', class:''},
    { path: '/test', title: 'Test1',  icon: 'pe-7s-graph', class: '' },
    { path: '/test2', title: 'Test2',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    
  
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
