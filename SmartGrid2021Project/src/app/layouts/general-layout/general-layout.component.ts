import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component'
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {
  private lastPoppedUrl: string = "";
  private yScrollStack: number[] = [];
  constructor(public location: Location) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');

    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    
    
  }

}
