import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule }  from '@angular/material/tooltip'

const modules = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
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
