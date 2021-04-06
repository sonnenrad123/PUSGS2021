import { Component, OnInit } from '@angular/core';
import { toBase64 } from '../../utils';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  constructor() { }
  imageBase64: string = "https://content.hostgator.com/img/weebly_image_sample.png";

  ngOnInit(): void {
  }

  change(event){
    if(event.target.files.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value:any) => this.imageBase64 = value.toString());
    }
  }
}
