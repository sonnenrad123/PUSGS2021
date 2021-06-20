import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-changes',
  templateUrl: './save-changes.component.html',
  styleUrls: ['./save-changes.component.css']
})
export class SaveChangesComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SaveChangesComponent>) { }

  ngOnInit(): void {
  }
  
  SaveWRBasicInfo(){
    this.dialogRef.close(true);
    
  }
  Cancel(){
    this.dialogRef.close();  
  }
}
