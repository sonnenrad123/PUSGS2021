import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/models/common/attachment';
import { SwitchingPlanService } from 'src/app/services/switching-plan/switching-plan.service';

@Component({
  selector: 'app-add-plan-attachments',
  templateUrl: './add-plan-attachments.component.html',
  styleUrls: ['./add-plan-attachments.component.css']
})
export class AddPlanAttachmentsComponent implements OnInit {

  files: any[] = [];
  URL: string = "";
  imageBase64: string = "";
  images: string[] = [];
  sdAttachments: Array<Attachment> = new Array<Attachment>();
  attachment: Attachment = {id : 0, type : '', progress:0, toBase64:'', name:'', size:0};

  constructor(private sdService: SwitchingPlanService, private router:Router) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('SWPMAttCurrValue') !== null){      
      this.files = JSON.parse(window.sessionStorage.getItem('SWPMAttCurrValue')) as Array<any>; 
      for (const item of this.files) {
        const file: File = item;
        this.attachment = {id: 0, toBase64 : '111', name : file.name, progress:100, size: file.size, type: file.type};
        this.sdAttachments.push(this.attachment);
      }
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

  window.sessionStorage.removeItem('SWPMAttCurrValue');
  window.sessionStorage.setItem('SWPMAttCurrValue', JSON.stringify(this.sdAttachments));
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
    this.sdAttachments.splice(index,1);
    this.files.splice(index, 1);
    this.images.splice(index, 1);
    window.sessionStorage.removeItem('SWPMAttCurrValue');
    window.sessionStorage.setItem('SWPMAttCurrValue', JSON.stringify(this.sdAttachments));
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
