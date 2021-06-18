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
import {   SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
import { IncidentMultimediaAttachmentsComponent } from './add-incident/incident-multimedia-attachments/incident-multimedia-attachments.component';
import { IncidentCallsNewCallComponent } from './add-incident/incident-calls/incident-calls-new-call/incident-calls-new-call.component';
import { SafetyDocumentsComponent } from './safety-documents/safety-documents.component';
import { UserAccountService } from './services/user-account/user-account.service';
import {IncidentServiceService } from './services/incident/incident-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AddSafetyDocumentComponent } from './add-safety-document/add-safety-document.component';
import { SafetyDocumentBasicInfoComponent } from './add-safety-document/safety-document-basic-info/safety-document-basic-info.component';
import { SafetyDocumentStatesHistoryComponent } from './add-safety-document/safety-document-states-history/safety-document-states-history.component';
import { SafetyDocumentMultimediaAttachmentsComponent } from './add-safety-document/safety-document-multimedia-attachments/safety-document-multimedia-attachments.component';
import { SafetyDocumentEquipmentComponent } from './add-safety-document/safety-document-equipment/safety-document-equipment.component';
import { SafetyDocumentChecklistComponent } from './add-safety-document/safety-document-checklist/safety-document-checklist.component';
import { AddNetworkElementComponent } from './add-network-element/add-network-element.component';
import { SearchNetworkElementsComponent } from './search-network-elements/search-network-elements.component';
import { NominatimService} from '../app/services/nominatim/nominatim.service';
import { GeocodingComponent } from './geocoding/geocoding.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { MapPointFormComponent } from './map-point-form/map-point-form.component';
import { IncidentDevicesDialogComponent } from './incident-devices-dialog/incident-devices-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeviceLocationDialogComponent } from './device-location-dialog/device-location-dialog.component';
import { AllUsersComponent } from './admin-access/all-users/all-users/all-users.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectCallerDialogComponent } from './add-incident/incident-calls/incident-calls-new-call/select-caller-dialog/select-caller-dialog.component'
import {MatList, MatListModule} from '@angular/material/list';
import { IncidentCrewComponent } from './add-incident/incident-crew/incident-crew.component';
import { TeamDisplayComponent } from './teams/team-display/team-display/team-display.component'
import { UserAccountComponent } from './user-account/user-account.component';
import { SwitchingPlansComponent } from './switching-plans/switching-plans.component';
import { AddSwitchingPlanComponent } from './add-switching-plan/add-switching-plan.component';
import { AddPlanBasicComponent } from './add-switching-plan/add-plan-basic/add-plan-basic.component';
import { AddPlanStateChangeHistoryComponent } from './add-switching-plan/add-plan-state-change-history/add-plan-state-change-history.component';
import { AddPlanEquipmentComponent } from './add-switching-plan/add-plan-equipment/add-plan-equipment.component';
import { AddPlanAttachmentsComponent } from './add-switching-plan/add-plan-attachments/add-plan-attachments.component';
import { AddPlanWorkInstructionsComponent } from './add-switching-plan/add-plan-work-instructions/add-plan-work-instructions.component';



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
    IncidentMultimediaAttachmentsComponent,
    IncidentCallsNewCallComponent,
    SafetyDocumentsComponent,
    AddSafetyDocumentComponent,
    SafetyDocumentBasicInfoComponent,
    SafetyDocumentStatesHistoryComponent,
    SafetyDocumentMultimediaAttachmentsComponent,
    SafetyDocumentEquipmentComponent,
    SafetyDocumentChecklistComponent,
    AddNetworkElementComponent,
    SearchNetworkElementsComponent,
    GeocodingComponent,
    ResultsListComponent,
    MapPointFormComponent,
    IncidentDevicesDialogComponent,
    DeviceLocationDialogComponent,
    AllUsersComponent,
    SelectCallerDialogComponent,
    IncidentCrewComponent,

    TeamDisplayComponent,
    UserAccountComponent,
    SwitchingPlansComponent,
    AddSwitchingPlanComponent,
    AddPlanBasicComponent,
    AddPlanStateChangeHistoryComponent,
    AddPlanEquipmentComponent,
    AddPlanAttachmentsComponent,
    AddPlanWorkInstructionsComponent
    
    
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
    HttpClientModule,
    SocialLoginModule,
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule,
    MatListModule
    
  ],
  exports:[MatDatepickerModule],
  providers: 
  [
    UserAccountService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers:[
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('49694634675-du89shg1f2e67vk9ccr773gdq87sgp84.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('152655660256522')
          }
        ]
      } as SocialAuthServiceConfig,
    } ,
    NominatimService,
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [IncidentDevicesDialogComponent,DeviceLocationDialogComponent,SelectCallerDialogComponent]
})
export class AppModule { }
