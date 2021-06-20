import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-server-errors',
  templateUrl: './display-server-errors.component.html',
  styleUrls: ['./display-server-errors.component.css']
})
export class DisplayServerErrorsComponent implements OnInit {
  
  @Input()
  errors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
