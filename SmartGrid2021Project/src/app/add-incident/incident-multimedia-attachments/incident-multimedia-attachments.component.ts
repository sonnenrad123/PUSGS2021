import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-multimedia-attachments',
  templateUrl: './incident-multimedia-attachments.component.html',
  styleUrls: ['./incident-multimedia-attachments.component.css']
})
export class IncidentMultimediaAttachmentsComponent implements OnInit {
  files: any[] = [];
  URL: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onFileDropped($event){
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files) {
    const target = files.currentTarget as HTMLInputElement;
    const elems = target.files as FileList;
    this.prepareFilesList(elems as any);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
   prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  deleteFile(index: number) {
    console.log(this.files);
  if (this.files[index].progress < 100) {
    console.log("Upload in progress.");
    return;
  }
  this.files.splice(index, 1);
}
uploadFilesSimulator(index: number) {
  setTimeout(() => {
    if (index === this.files.length) {
      return;
    } else {
      const progressInterval = setInterval(() => {
        if (this.files[index].progress === 100) {
          clearInterval(progressInterval);
          this.uploadFilesSimulator(index + 1);
        } else {
          this.files[index].progress += 5;
        }
      }, 200);
    }
  }, 500);
}

}
