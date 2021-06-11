import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feature, View } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import  Map  from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export interface Device{
  id:string;
  name:string;
  type:string;
  coordinates:string;
  address:string;
}


@Component({
  selector: 'app-device-location-dialog',
  templateUrl: './device-location-dialog.component.html',
  styleUrls: ['./device-location-dialog.component.css']
})




export class DeviceLocationDialogComponent implements OnInit {
  map: Map | undefined;
  lastLayer:any;
  device:Device;
  latitude:any;
  longitude:any;
  constructor(private dialogRef:MatDialogRef<DeviceLocationDialogComponent>,@Inject(MAT_DIALOG_DATA) data) { 
    this.device = data;

   }

  ngOnInit(): void {
    var strings = this.device.coordinates.split('  ');
    var lat = strings[0];
    var lon = strings[1];
    lat = lat.replace('Lat: ','');
    lon = lon.replace('Lon: ','');
    this.latitude = lat;
    this.longitude = lon;

    this.map = new Map({
      target: 'smart_grid_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([19.833549, 45.267136]),
        zoom: 10
      })
    });
    var layer = new VectorLayer({
      source: new VectorSource({
        features:[
          new Feature({
            geometry: new Point(fromLonLat([19.833549, 45.267136]))
          })
        ]
      }),
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
      })
    });
    this.lastLayer = layer;
    this.map.addLayer(layer);


    this.createMarker();
  }


  private createMarker() {
    this.clearMap();
    const coordinates = fromLonLat([this.longitude,this.latitude]);
    
    const iconFeature = new Feature({
      geometry: new Point(coordinates),
      name: 'Device on address:' + this.device.address,
    });
    this.map.setView(new View({
      center: coordinates,
      zoom: 21
    }))
    var layer = new VectorLayer({
      source: new VectorSource({
        features:[
          new Feature({
            geometry: new Point(coordinates)
          })
        ]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/img/map-marker-icon.png',
          
        })
      })
    });
    this.map.addLayer(layer);
    this.lastLayer = layer;
  }
  private clearMap() {
    if(this.lastLayer != null){
      this.map.removeLayer(this.lastLayer);
    }
  }
  close() {
    this.dialogRef.close();
  }

}
