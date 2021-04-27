import { Directive, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDropImg]'
})

export class DragAndDropImgDirective {
  @HostBinding("class.fileover") fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener("dragover", ["$event"]) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener("dragleave", ["$event"]) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener("drop", ["$event"]) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}