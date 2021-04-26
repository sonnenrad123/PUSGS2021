import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularMaterialModule } from './angular-material/angular-material.module'


import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { InputImageComponent } from './utilities/input-image/input-image/input-image.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { MapComponent } from './map/map.component';
import { IncidentBrowserComponent } from './incident-browser/incident-browser.component';

import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { WorkRequestsComponent } from './work-requests/work-requests.component';
import { MatTableComponent } from './common/mat-table/mat-table/mat-table.component';
import { DataPropertyGetterPipe } from './common/mat-table/data-property-getter/data-property-getter.pipe';
import { IncidentBasicInfoComponent } from './add-incident/incident-basic-info/incident-basic-info.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule} from '@angular/forms';
import { IncidentDevicesComponent } from './add-incident/incident-devices/incident-devices.component';
import {MatIconModule} from '@angular/material/icon';
import { AddWorkRequestComponent } from './work-requests/add-work-request/add-work-request.component';
import { BasicInfoComponent } from './work-requests/add-work-request/basic-info/basic-info.component';
import { ChangesHistoryComponent } from './work-requests/add-work-request/changes-history/changes-history.component';
import { MultimediaAttachmentsComponent } from './work-requests/add-work-request/multimedia-attachments/multimedia-attachments.component';
import { EquipmentComponent } from './work-requests/add-work-request/equipment/equipment.component';
import { IncidentResolutionComponent } from './add-incident/incident-resolution/incident-resolution.component';
import { IncidentCallsComponent } from './add-incident/incident-calls/incident-calls.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragAndDropImgDirective } from './utilities/drag-and-drop-input/drag-and-drop-img.directive';
import { ProgressBarComponent } from './utilities/progress-bar/progress-bar/progress-bar.component';
import { TeamsComponent } from './teams/teams/teams.component';
import { AddNewTeamComponent } from './teams/add-new-team/add-new-team.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    TestComponentComponent,
    TestComponent2Component,
    RegisterComponent,
    InputImageComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    IncidentBrowserComponent,
    AddIncidentComponent,
    WorkRequestsComponent,
    MatTableComponent,
    DataPropertyGetterPipe,
    IncidentBasicInfoComponent,
    IncidentDevicesComponent,
    AddWorkRequestComponent,
    BasicInfoComponent,
    ChangesHistoryComponent,
    MultimediaAttachmentsComponent,
    EquipmentComponent,
    IncidentResolutionComponent,
    IncidentCallsComponent,
    DragAndDropImgDirective,
    ProgressBarComponent,
    TeamsComponent,
    AddNewTeamComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatIconModule, 
    MatCommonModule,
    MatSlideToggleModule,
  ],
  exports:[MatDatepickerModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
