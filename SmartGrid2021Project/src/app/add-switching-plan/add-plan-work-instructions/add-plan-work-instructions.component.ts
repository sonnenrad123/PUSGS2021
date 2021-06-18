import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface WorkInstruction{
  id:string;
  desc:string;
  device:string;
  executed:string;
}

@Component({
  selector: 'app-add-plan-work-instructions',
  templateUrl: './add-plan-work-instructions.component.html',
  styleUrls: ['./add-plan-work-instructions.component.css']
})
export class AddPlanWorkInstructionsComponent implements OnInit {

  displayedColumns: string[] = ['id','desc','device','executed', 'remove','execute'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  addWorkInstuction : FormGroup;
  color : string;
  badColor: string;

  allWorkInstructions : WorkInstruction[] =[
    {id:"1", desc:"otvori", device:"dev1", executed:"executed"},
    {id:"2", desc:"otvori", device:"dev1", executed:"executed"},
    {id:"3", desc:"otvori", device:"dev1", executed:"executed"},
    {id:"4", desc:"otvori", device:"dev1", executed:"executed"},
    {id:"5", desc:"otvori", device:"dev1", executed:"executed"}
  ]

  dataSource: MatTableDataSource<WorkInstruction>;

  constructor() { }

  ngOnInit(): void {
    this.addWorkInstuction = new FormGroup({
      'id':new FormControl('hidden',[Validators.required]),
      'desc':new FormControl('',[Validators.required]),
      'device':new FormControl('',[Validators.required]),
      'executed' : new FormControl('unexecuted',[Validators.required])
    });
    this.badColor = "#FF6464";
    this.dataSource = new MatTableDataSource(this.allWorkInstructions);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(){
    
  };

  removeWorkInstruction(row:any){
    console.log('Remove device with id: ' + row.id);
    this.color = "#FF6464"
  }

  removeAll(){
    console.log('Remove all work instructions');
    this.color = "#64FF64"
  }

}
