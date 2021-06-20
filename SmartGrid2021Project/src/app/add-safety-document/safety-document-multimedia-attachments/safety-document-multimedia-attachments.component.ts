import { Component, OnInit } from '@angular/core';
import { toBase64 } from 'src/app/utilities/utils';
import { Attachment } from 'src/app/models/common/attachment';
import { SafetyDocumentService } from '../../services/safety-documents/safety-document.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-safety-document-multimedia-attachments',
  templateUrl: './safety-document-multimedia-attachments.component.html',
  styleUrls: ['./safety-document-multimedia-attachments.component.css']
})
export class SafetyDocumentMultimediaAttachmentsComponent implements OnInit {
  files: any[] = [];
  URL: string = "";
  imageBase64: string = "";
  images: string[] = [];
  sdAttachments: Array<Attachment> = new Array<Attachment>();
  attachment: Attachment = {id : 0, type : '', progress:0, toBase64:'', name:'', size:0};

  constructor(private sdService: SafetyDocumentService, private router:Router) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('SDMAttCurrValue') !== null){      
      this.files = JSON.parse(window.sessionStorage.getItem('SDMAttCurrValue')) as Array<any>; 
      console.log(this.files);
    }
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
      const file: File = item;
      this.attachment = {id: 0, toBase64 : '111', name : file.name, progress:100, size: file.size, type: file.type};
      console.log(file);
    item.progress = 0;
    this.files.push(item);
    
    this.sdAttachments.push(this.attachment);
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
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
    this.images.splice(index, 1);
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
SaveChanges(){
  window.sessionStorage.removeItem('SDMAttCurrValue');
    window.sessionStorage.setItem('SDMAttCurrValue', JSON.stringify(this.sdAttachments));
    console.log(this.sdAttachments);
}
}
