import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule }  from '@angular/material/tooltip'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatCommonModule } from '@angular/material/core'

const modules = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatIconModule, 
  MatCommonModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    modules
  ]
})
export class AngularMaterialModule { }
