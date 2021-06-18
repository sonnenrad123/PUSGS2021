import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/models/common/attachment';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';
import { toBase64 } from 'src/app/utilities/utils';

@Component({
  selector: 'app-multimedia-attachments',
  templateUrl: './multimedia-attachments.component.html',
  styleUrls: ['./multimedia-attachments.component.css']
})
export class MultimediaAttachmentsComponent implements OnInit {
  files: any[] = [];
  URL: string = "";
  imageBase64: string = "";
  images: string[] = [];
  wrAttachments: Array<Attachment> = new Array<Attachment>();
  attachment: Attachment = {id : 0, type : '', progress:0, toBase64:'', name:'', size:0};

  constructor(private wrService: WorkRequestsService, private router:Router) { }

  ngOnInit(): void {
    //window.sessionStorage.removeItem('WRMAttCurrValue');
    if(window.sessionStorage.getItem('WRMAttCurrValue') !== null){      
        this.files = JSON.parse(window.sessionStorage.getItem('WRMAttCurrValue')) as Array<any>; 
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
        this.attachment = {id: 0, toBase64 : item.toBase64, name : file.name, progress:100, size: file.size, type: file.type};

        toBase64(file).then((value:any) => this.imageBase64 = value.toString()).then(_ =>  {
          item.toBase64 = this.imageBase64;
          this.images.push(this.imageBase64);
          this.attachment.toBase64 = this.imageBase64;

        });
        
      item.progress = 0;
      this.files.push(item);
      
      this.wrAttachments.push(this.attachment);
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

  Cancel(){
    this.router.navigate(['WorkRequests']);
  }

  SaveChanges(){
    window.sessionStorage.removeItem('WRMAttCurrValue');
    window.sessionStorage.setItem('WRMAttCurrValue', JSON.stringify(this.wrAttachments));
  }
}
