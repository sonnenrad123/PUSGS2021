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
import { ActivatedRoute } from '@angular/router'
import { Device } from '../incident-devices-dialog/incident-devices-dialog.component';
import { DeviceService} from '../services/device/device.service';
import { MapPoint } from '../models/map-point/map-point.model';
import { fromLonLat } from 'ol/proj';

import Vector from 'ol/layer/Vector';
import { toSize } from 'ol/size';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map | undefined;

  deviceId:string;
  showDevice:Device = null;
  latitude:any;
  longitude:any;
  name:any;
  mapPoint: MapPoint;
  lastLayer:any;
  constructor(private route: ActivatedRoute,private DeviceService:DeviceService) { }
  
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
      }),
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
      })
    });
    this.lastLayer = layer;
    this.map.addLayer(layer);
    this.deviceId  = this.route.snapshot.paramMap.get('deviceId');
    if(this.deviceId != null){//ako zelimo da prikazemo lokaciju elementa mreze
      this.readDevice();
      this.createMarker();
    }
    else{
      //inace drugo nesto
    }





    
  }
  


  readDevice(){
    this.DeviceService.getDevice(this.deviceId).subscribe(
      device => {
        this.showDevice = device;
        console.log(device);
        this.name = this.showDevice.address;
        var strings = this.showDevice.coordinates.split('  ');
        var lat = strings[0];
        var lon = strings[1];
        lat = lat.replace('Lat: ','');
        lon = lon.replace('Lon: ','');
        this.latitude = lat;
        this.longitude = lon;
        this.updateMapPoint(this.latitude,this.longitude,this.name);
        this.createMarker();
      },
      error => {
        console.log(error);
      }
    );
  }
  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }
  private createMarker() {
    this.clearMap();
    const coordinates = fromLonLat([this.mapPoint.longitude,this.mapPoint.latitude]);
    
    const iconFeature = new Feature({
      geometry: new Point(coordinates),
      name: 'Device on address:' + this.name,
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
    this.map.removeLayer(this.lastLayer);
  }

  
}
