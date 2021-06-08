import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import {NominatimService} from '../services/nominatim/nominatim.service';



@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent implements OnInit {
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[];


  constructor(private nominatimService: NominatimService) { }

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

  ngOnInit(): void {
  }

}
