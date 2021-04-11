import { Component, OnInit } from '@angular/core';

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

}
