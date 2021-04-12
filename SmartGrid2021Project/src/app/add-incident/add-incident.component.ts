import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  toggledButton:string;
  constructor() { }

  ngOnInit(): void {
    this.toggledButton = "BI";
  }


  toggle(param){
    this.toggledButton = param;
  }
  
  onIndexChanged(event : MatTabChangeEvent){
    switch(event.index){
      case 0:
        this.toggledButton="BI";
        break;
      case 1:
        this.toggledButton="Devices";
        break;
      case 2:
        this.toggledButton="Resolution";
        break;
      case 3:
        this.toggledButton="Calls";
        break;
      case 4:
        this.toggledButton="Crew";
        break;
      case 5:
        this.toggledButton="MA";
        break;
      case 6:
        this.toggledButton="Equipment";
        break;      
    }

  }
}
