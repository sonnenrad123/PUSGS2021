import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectCallerDialogComponent } from 'src/app/add-incident/incident-calls/incident-calls-new-call/select-caller-dialog/select-caller-dialog.component';

export interface WorkInstruction{
  desc:string;
  device:string;
  executed:string;
  id?:string;
  canExecute?:boolean;
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

  allWorkInstructions : WorkInstruction[] =[]

  dataSource: MatTableDataSource<WorkInstruction>;

  constructor() { }

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
    this.allWorkInstructions.push({desc: this.addWorkInstuction.get('desc').value, device: this.addWorkInstuction.get('device').value,executed: this.addWorkInstuction.get('executed').value})
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
    this.allWorkInstructions = [];
    window.sessionStorage.setItem('switchingPlanInsForm',JSON.stringify(this.allWorkInstructions));
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
    this.dataSource.paginator = this.paginator;
    }

}
