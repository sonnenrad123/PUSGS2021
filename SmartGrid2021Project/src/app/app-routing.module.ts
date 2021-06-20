import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { HomeComponent } from './home/home.component';
import { IncidentBrowserComponent } from './incident-browser/incident-browser.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { MapComponent } from './map/map.component';
import { RegisterComponent } from './register/register.component';
import { AddNewTeamComponent } from './teams/add-new-team/add-new-team.component';
import { TeamsComponent } from './teams/teams/teams.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
import { AddWorkRequestComponent } from './work-requests/add-work-request/add-work-request.component';
import { BasicInfoComponent } from './work-requests/add-work-request/basic-info/basic-info.component';
import { ChangesHistoryComponent } from './work-requests/add-work-request/changes-history/changes-history.component';
import { EquipmentComponent } from './work-requests/add-work-request/equipment/equipment.component';
import { MultimediaAttachmentsComponent } from './work-requests/add-work-request/multimedia-attachments/multimedia-attachments.component';
import { WorkRequestsComponent } from './work-requests/work-requests.component';
import { IncidentBasicInfoComponent } from './add-incident/incident-basic-info/incident-basic-info.component';
import { IncidentCallsComponent } from './add-incident/incident-calls/incident-calls.component';
import {IncidentDevicesComponent} from './add-incident/incident-devices/incident-devices.component';
import { IncidentResolutionComponent } from './add-incident/incident-resolution/incident-resolution.component';
import { IncidentMultimediaAttachmentsComponent } from './add-incident/incident-multimedia-attachments/incident-multimedia-attachments.component';
import { IncidentCallsNewCallComponent } from './add-incident/incident-calls/incident-calls-new-call/incident-calls-new-call.component';
import { SafetyDocumentsComponent } from './safety-documents/safety-documents.component';
import { AddSafetyDocumentComponent } from './add-safety-document/add-safety-document.component';
import { SafetyDocumentBasicInfoComponent } from './add-safety-document/safety-document-basic-info/safety-document-basic-info.component';
import { SafetyDocumentStatesHistoryComponent } from './add-safety-document/safety-document-states-history/safety-document-states-history.component';
import { SafetyDocumentMultimediaAttachmentsComponent } from './add-safety-document/safety-document-multimedia-attachments/safety-document-multimedia-attachments.component';
import { SafetyDocumentEquipmentComponent } from './add-safety-document/safety-document-equipment/safety-document-equipment.component';
import { SafetyDocumentChecklistComponent } from './add-safety-document/safety-document-checklist/safety-document-checklist.component';
import { SearchNetworkElementsComponent } from './search-network-elements/search-network-elements.component';
import { AddNetworkElementComponent } from './add-network-element/add-network-element.component';
import { AllUsersComponent } from './admin-access/all-users/all-users/all-users.component';
import { IncidentCrewComponent } from './add-incident/incident-crew/incident-crew.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { UserAccountComponent } from './user-account/user-account.component';
import { SwitchingPlansComponent } from './switching-plans/switching-plans.component';
import { AddPlanBasicComponent } from './add-switching-plan/add-plan-basic/add-plan-basic.component';
import { AddPlanEquipmentComponent } from './add-switching-plan/add-plan-equipment/add-plan-equipment.component';
import { AddPlanStateChangeHistoryComponent } from './add-switching-plan/add-plan-state-change-history/add-plan-state-change-history.component';
import { AddPlanAttachmentsComponent } from './add-switching-plan/add-plan-attachments/add-plan-attachments.component';
import { AddPlanWorkInstructionsComponent } from './add-switching-plan/add-plan-work-instructions/add-plan-work-instructions.component';
import { AddSwitchingPlanComponent } from './add-switching-plan/add-switching-plan.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
    
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'map',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: MapComponent},
    ]
  },
  {
    path:'AllUsers',
    component:GeneralLayoutComponent,
    children:[
      {path:'', component:AllUsersComponent, canActivate:[IsAdminGuard]},
    ]
  },
  {
    path:'map/:deviceId',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: MapComponent},
    ]
    
  },

  {
    path:'UserAccount',
    component: GeneralLayoutComponent,
    children:
    [{
      path: '', component: UserAccountComponent,
    },]
  },
  {
    path:'IncidentBrowser',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: IncidentBrowserComponent},
    ]
  },
  {
    path:'AddIncident',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddIncidentComponent, children:[
        {path:'BasicInfo', component: IncidentBasicInfoComponent},
        {path:'Devices', component: IncidentDevicesComponent},
        {path:'Resolution', component: IncidentResolutionComponent},
        {path:'Calls', component: IncidentCallsComponent, children:[
          {path:'AddNew', component:IncidentCallsNewCallComponent}
        ]},
        {path: 'MultimediaAttachments', component: IncidentMultimediaAttachmentsComponent},
        {path:'Crew',component:IncidentCrewComponent},
      ]},
    ]
  },
  {
    path:'AddIncident/:incidentId',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddIncidentComponent, children:[
        {path:'BasicInfo', component: IncidentBasicInfoComponent},
        {path:'Devices', component: IncidentDevicesComponent},
        {path:'Resolution', component: IncidentResolutionComponent},
        {path:'Calls', component: IncidentCallsComponent, children:[
          {path:'AddNew', component:IncidentCallsNewCallComponent}
        ]},
        {path: 'MultimediaAttachments', component: IncidentMultimediaAttachmentsComponent},
        {path:'Crew',component:IncidentCrewComponent},
      ]},
    ]
  },
  {
    path:'AddSafetyDocument',
    component: GeneralLayoutComponent,
    children:[
      {
        path:'',component: AddSafetyDocumentComponent, children:[
          {path:'BasicInfo', component: SafetyDocumentBasicInfoComponent},
          {path:'StatesHistory', component: SafetyDocumentStatesHistoryComponent},
          {path:'MultimediaAttachments', component:SafetyDocumentMultimediaAttachmentsComponent},
          {path:'Equipment', component:SafetyDocumentEquipmentComponent},
          {path:'Checklist', component:SafetyDocumentChecklistComponent}
        ]
      },
    ]
  },

  {
    path:'AddSwitchingPlan',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddSwitchingPlanComponent, children:[
        {path:'BasicInfo', component: AddPlanBasicComponent},
        {path:'Equipment', component: AddPlanEquipmentComponent},
        {path:'StateChanged', component: AddPlanStateChangeHistoryComponent},
        {path: 'Attachments', component: AddPlanAttachmentsComponent},
        {path:'WorkInstructions', component: AddPlanWorkInstructionsComponent, children:[
          {path:'AddNew', component:AddPlanWorkInstructionsComponent}
        ]},
      ]},
    ]
  },

  {path: 'SwitchingPlans',
  component : GeneralLayoutComponent,
  children:[
    {path: '', component: SwitchingPlansComponent},
  ]
  },

  {
    path:'WorkRequests',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: WorkRequestsComponent
      },
    ]
  },
  {
    path:'SafetyDocuments',
    component: GeneralLayoutComponent,
    children:[
      {
        path:'',component:SafetyDocumentsComponent
      },
    ]
  },
  {
    path:'SearchNetworkElements',
    component: GeneralLayoutComponent,
    children:[
      {
        path:'',component:SearchNetworkElementsComponent
      },
    ]
  },
  {
    path:'AddNetworkElement',
    component: GeneralLayoutComponent,
    children:[
      {
        path:'',component:AddNetworkElementComponent
      }
    ]
  },
  {
    path:'createworkrequest',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddWorkRequestComponent, children: [
        {path: 'BasicInfo', component: BasicInfoComponent},
        {path: 'ChangesHistory', component: ChangesHistoryComponent},
        {path: 'MultimediaAttachments', component: MultimediaAttachmentsComponent},
        {path: 'Equipment', component: EquipmentComponent},
      ]},
    ]
  },
  {
    path:'createworkrequest/:id',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddWorkRequestComponent, children: [
        {path: 'BasicInfo', component: BasicInfoComponent},
        {path: 'ChangesHistory', component: ChangesHistoryComponent},
        {path: 'MultimediaAttachments', component: MultimediaAttachmentsComponent},
        {path: 'Equipment', component: EquipmentComponent},
      ]},
    ]
  },
  {
    path:'TeamsView',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: TeamsComponent},
    ]
  },
  {
    path:'CreateNewTeam',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddNewTeamComponent},
    ]
  },
  {
    path:'switchingplans',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: TestComponentComponent},
    ]
  },
  {
    path:'Notifications',
    component: GeneralLayoutComponent,
    children:[
      {path: '', component:NotificationsComponent}
    ]
  },
  {
    path:'test',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: TestComponentComponent},
    ]
  },
  {
    path:'test2',
    component: GeneralLayoutComponent,
    children:[
      {path: '', component: TestComponent2Component}
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
