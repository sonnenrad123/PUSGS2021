import { Component, OnInit } from '@angular/core';
import VectorSource from 'ol/source/Vector';
import  Map  from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Layer from 'ol/layer/Layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map | undefined;

  constructor() { }
  
  ngOnInit(): void {
    this.map = new Map({
      target: 'smart_grid_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([19.833549, 45.267136]),
        zoom: 10
      })
    });
    var layer = new VectorLayer({
      source: new VectorSource({
        features:[
          new Feature({
            geometry: new Point(olProj.fromLonLat([19.833549, 45.267136]))
          })
        ]
      })
    });
    this.map.addLayer(layer);
  }

}
