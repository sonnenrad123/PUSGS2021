import { Component, OnInit } from '@angular/core';
import VectorSource from 'ol/source/Vector';
import  Map  from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import Layer from 'ol/layer/Layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {  ActivatedRoute, Router } from '@angular/router'
import { Device } from '../incident-devices-dialog/incident-devices-dialog.component';
import { DeviceService} from '../services/device/device.service';
import { MapPoint } from '../models/map-point/map-point.model';
import { fromLonLat } from 'ol/proj';

import Vector from 'ol/layer/Vector';
import { toSize } from 'ol/size';
import { IncidentServiceService } from '../services/incident/incident-service.service';
import { Overlay } from '@angular/cdk/overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import { Incident } from '../incident-browser/incident-browser.component';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { MapService } from '../services/map/map.service';
import { Route } from '@angular/compiler/src/core';
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
  allIncidents: any[] = [];
  
  constructor(private route: ActivatedRoute, private router: Router, private DeviceService:DeviceService, private mapService: MapService, private incService: IncidentServiceService) { }
  
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
        features:[ new Feature({ geometry: new Point(olProj.fromLonLat([19.833549, 45.267136])) })]}),
      
        style: new Style({image: new Icon({src: 'https://openlayers.org/en/latest/examples/data/icon.png' })})
      });
    this.lastLayer = layer;
    this.map.addLayer(layer);
    
  

    this.map.on("click", (evt) => {
      var feature = this.map.forEachFeatureAtPixel(evt.pixel, function(feature){
        return feature;
      });
      if(feature){
        this.router.navigate(["AddIncident/"+(feature as Feature).get('IncID')]);
            //console.log((feature as Feature).get('IncID'));
            /*this.incService.getIncident((feature as Feature).get('IncID')). subscribe(
              (data) => {
                console.log(data);
                var id = data;
                this.router.navigate(["createworkrequest/"+id]);
              },
              (err) => {
                console.log(err);
              }
            );*/
      }
    });
    var markerLayer = new VectorLayer({
    
      source: new VectorSource({
        features:
        []
        }),
      
        style: new Style(
          {
            image: new Icon(
              {
                src: '../../assets/img/outline_report_problem_black_24dp.png', 
                 
              }
              )
            }
          )
      });
      //Layer for sw plan markers
      var markerTeamLayer = new VectorLayer({
    
        source: new VectorSource({
          features:
          []
          }),
        
          style: new Style(
            {
              image: new Icon(
                {
                  src: '../../assets/img/images.png', 
                   
                }
                )
              }
            )
      });
      var features: Array<Feature> = new Array<Feature>();
      
      this.map.addLayer(markerLayer);
    this.mapService.getIncidentsForMap().subscribe(
      (data) => {
        console.log(data);
        this.allIncidents = data;
        for(var j = 0; j < this.allIncidents.length; j++){
          
            var latLon : string[] = this.allIncidents[j].devices[0].coordinates.split(' ');
            var newFeat = new Feature({
              geometry: new Point(olProj.fromLonLat([Number(latLon[4]), Number(latLon[1])]))
            });
            newFeat.set('IncID' , this.allIncidents[j].id.toString())
            
            features.push(newFeat);
        }
        markerLayer.setSource(new VectorSource({features}));
        features = new Array<Feature>();
      /*
      //For switching plans
        for(var j = 0; j < this.allIncidents.length; j++){
          
          var latLon : string[] = this.allIncidents[j].devices[0].coordinates.split(' ');
          var newFeat = new Feature({
            geometry: new Point(olProj.fromLonLat([Number(latLon[4])+0.100016, Number(latLon[1])-0.000009]))
          })
          features.push(newFeat);
      }
      markerTeamLayer.setSource(new VectorSource({features}));
      this.map.addLayer(markerTeamLayer);*/
      },
      (err) => {
        console.log(err);
      }
    );
    
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
