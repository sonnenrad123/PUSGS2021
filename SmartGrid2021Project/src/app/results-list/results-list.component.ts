import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import { MatMenuModule} from '@angular/material/menu'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent {
  @Input()
  results: NominatimResponse[];
  @Output()
  locationSelected = new EventEmitter();


  constructor() { }

  selectResult(result: NominatimResponse) {
    this.locationSelected.emit(result);
    this.results = [];
  }

}
