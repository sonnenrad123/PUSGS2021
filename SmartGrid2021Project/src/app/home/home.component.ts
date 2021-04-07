import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  showVideo:boolean = true;
  tempst:string = "";
  constructor() { }

  ngOnInit(): void {
    this.showVideo = !(window.sessionStorage.getItem('showIntroVideo') === 'true');
    if(this.showVideo){
      window.sessionStorage.setItem('showIntroVideo', 'true');
    }
  }
  
  refresh(){
    window.location.reload();
  }

}
