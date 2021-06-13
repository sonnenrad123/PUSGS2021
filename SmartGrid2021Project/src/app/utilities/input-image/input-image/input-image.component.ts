import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { toBase64 } from '../../utils';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  constructor() { }
   imageBase64: string = "https://content.hostgator.com/img/weebly_image_sample.png";
   @Output() onImageUploaded = new EventEmitter<any>();
  ngOnInit(): void {
  }

  change($event){
    if($event.target.files.length > 0){
      const file: File = $event.target.files[0];
      toBase64(file).then((value:any) => this.imageBase64 = value.toString()).then(_ => this.onImageUploaded.emit(this.imageBase64));
    }
    
  }
}
