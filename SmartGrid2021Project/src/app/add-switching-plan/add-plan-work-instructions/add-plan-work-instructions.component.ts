import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectCallerDialogComponent } from 'src/app/add-incident/incident-calls/incident-calls-new-call/select-caller-dialog/select-caller-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectDeviceDialogComponent } from 'src/app/select-device-dialog/select-device-dialog.component';
import { Device } from 'src/app/incident-devices-dialog/incident-devices-dialog.component';

export interface WorkInstruction{
  desc:string;
  device:string;
  executed:string;
  color:string;
  id?:string;
  canExecute?:boolean;
  canDelete?:boolean;
}

@Component({
  selector: 'app-add-plan-work-instructions',
  templateUrl: './add-plan-work-instructions.component.html',
  styleUrls: ['./add-plan-work-instructions.component.css']
})
export class AddPlanWorkInstructionsComponent implements OnInit {

  displayedColumns: string[] = ['desc','device','executed', 'remove','execute'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  addWorkInstuction : FormGroup;
  color : string = "#FF6464";
  goodColor: string = "#64FF64";

  selectedDevice: Device;

  allWorkInstructions : WorkInstruction[] =[]

  dataSource: MatTableDataSource<WorkInstruction>;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.addWorkInstuction = new FormGroup({
      'desc':new FormControl('',[Validators.required]),
      'device':new FormControl('',[Validators.required]),
      'executed' : new FormControl('Unexecuted',[Validators.required])
    });
    if(window.sessionStorage.getItem('switchingPlanInsForm') != null){
      this.allWorkInstructions = JSON.parse(window.sessionStorage.getItem('switchingPlanInsForm'));
    }
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(){
    console.log(this.addWorkInstuction.value);
    this.allWorkInstructions.push({desc: this.addWorkInstuction.get('desc').value, device: this.addWorkInstuction.get('device').value,executed: this.addWorkInstuction.get('executed').value, color:"#FF6464"})
    window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(this.allWorkInstructions));
    this.dataSource =new MatTableDataSource(this.allWorkInstructions);
    this.dataSource.paginator = this.paginator;
  };

  removeWorkInstruction(row:any){
    console.log('Remove work instruction' + row);
    let switchingPlanSelectedRow = JSON.parse(window.sessionStorage.getItem('switchingPlanInsForm'));

    switchingPlanSelectedRow.forEach((x,index) => {
      if(x.desc == row.desc && x.device == row.device && x.executed == row.executed){
        switchingPlanSelectedRow.splice(index,1);
      }
    });

    window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(switchingPlanSelectedRow));
    this.allWorkInstructions = switchingPlanSelectedRow;
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
    this.dataSource.paginator = this.paginator;
  }

  removeAll(){
    console.log('Remove all work instructions');
    this.allWorkInstructions = this.allWorkInstructions.filter(x=> x.executed == "Executed");
    window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(this.allWorkInstructions));
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
    this.dataSource.paginator = this.paginator;
    }

  executeWI(row:any){
    let switchingPlanSelectedRow = JSON.parse(window.sessionStorage.getItem('switchingPlanInsForm'));

    switchingPlanSelectedRow.forEach((x,index) => {
      if(x.desc == row.desc && x.device == row.device && x.executed == row.executed){
        x.executed = "Executed";
      }
    });

    window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(switchingPlanSelectedRow));
    this.allWorkInstructions = switchingPlanSelectedRow;
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
    this.dataSource.paginator = this.paginator;
  }
  
  ChooseDevice(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1200px';
    dialogConfig.minHeight = '600px';
    const dialogRef = this.dialog.open(SelectDeviceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        //window.sessionStorage.setItem('switchingPlanSelectedIncident',JSON.stringify(data));
        this.selectedDevice = data;
        this.addWorkInstuction.controls['device'].setValue(this.selectedDevice.name);
      }
      
    );
  }

}
