import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-add-work-request',
  templateUrl: './add-work-request.component.html',
  styleUrls: ['./add-work-request.component.css']
})
export class AddWorkRequestComponent implements OnInit {
  tab1Visible: boolean = true;
  tab2Visible: boolean = false;
  tab3Visible: boolean = false;
  tab4Visible: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onIndexChanged(event : MatTabChangeEvent){
    if(event.index === 0){
      this.tab1Visible = true;
      this.tab2Visible = false;
      this.tab3Visible = false;
      this.tab4Visible = false;
    }
    else if(event.index === 1){
      this.tab1Visible = false;
      this.tab2Visible = true;
      this.tab3Visible = false;
      this.tab4Visible = false;
    }
    else if(event.index === 2){
      this.tab1Visible = false;
      this.tab2Visible = false;
      this.tab3Visible = true;
      this.tab4Visible = false;
    }
    else if(event.index === 3){
      this.tab1Visible = false;
      this.tab2Visible = false;
      this.tab3Visible = false;
      this.tab4Visible = true;
    }

  }
}
